package bus.station.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import bus.station.model.Prevoznik;
import bus.station.repository.PrevoznikRepository;
import bus.station.service.PrevoznikService;

@Service
public class JpaPrevoznikService implements PrevoznikService{
	
	@Autowired
	private PrevoznikRepository prevoznikRepository;

	@Override
	public Prevoznik findOne(Long id) {
		// TODO Auto-generated method stub
		return prevoznikRepository.findOneById(id);
	}

	@Override
	public List<Prevoznik> findAll() {
		// TODO Auto-generated method stub
		return prevoznikRepository.findAll();
	}

	@Override
	public Page<Prevoznik> findAll(int pageNo) {
		// TODO Auto-generated method stub
		return prevoznikRepository.findAll(PageRequest.of(pageNo, 10));
	}

	@Override
	public Prevoznik save(Prevoznik prevoznik) {
		// TODO Auto-generated method stub
		return prevoznikRepository.save(prevoznik);
	}

	@Override
	public Prevoznik delete(Long id) {
		Prevoznik prevoznik = findOne(id);
		if(prevoznik != null) {
			prevoznikRepository.delete(prevoznik);
			return prevoznik;
		}
		return null;
	}

	@Override
	public Prevoznik update(Prevoznik prevoznik) {
		// TODO Auto-generated method stub
		return prevoznikRepository.save(prevoznik);
	}

}
