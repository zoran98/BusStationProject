package bus.station.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import bus.station.model.Linija;
import bus.station.model.Prevoznik;
import bus.station.repository.LinijaRepository;
import bus.station.service.LinijaService;

@Service
public class JpaLinijaService implements LinijaService{
	
	@Autowired
	private LinijaRepository linijaRepository;

	@Override
	public Linija findOne(Long id) {
		return linijaRepository.findOneById(id);
	}

	@Override
	public Page<Linija> findAll(int pageNo) {
		return linijaRepository.findAll(PageRequest.of(pageNo, 4));
	}

	@Override
	public Linija save(Linija linija) {
		return linijaRepository.save(linija);
	}

	@Override
	public Linija delete(Long id) {
		Linija linija = findOne(id);
		if(linija != null) {
			Prevoznik p = linija.getPrevoznik();
			p.removeLinija(linija.getId());
			linijaRepository.delete(linija);
			return linija;
		}
		return null;
	}

	@Override
	public Linija update(Linija linija) {
		return linijaRepository.save(linija);
	}

	@Override
	public Page<Linija> search(Long prevoznikId, String destinacija, int pageNo) {
		if(destinacija != null) {
			destinacija = "%" + destinacija + "%";
		}
		return linijaRepository.search(prevoznikId, destinacija, PageRequest.of(pageNo, 10));
	}

}
