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

}
