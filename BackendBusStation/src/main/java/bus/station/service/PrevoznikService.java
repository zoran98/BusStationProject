package bus.station.service;

import java.util.List;

import org.springframework.data.domain.Page;

import bus.station.model.Prevoznik;

public interface PrevoznikService {
	
	Prevoznik findOne(Long id);
	List<Prevoznik> findAll();
	Page<Prevoznik> findAll(int pageNo);

}
