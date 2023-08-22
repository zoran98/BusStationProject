package bus.station.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import bus.station.model.Linija;
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

}
