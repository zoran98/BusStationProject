package bus.station.service;

import java.util.List;

import org.springframework.data.domain.Page;

import bus.station.model.Prevoznik;

public interface PrevoznikService {
	
	Prevoznik findOne(Long id);
	List<Prevoznik> findAll();
	Page<Prevoznik> findAll(int pageNo);
	Prevoznik save(Prevoznik prevoznik);
	Prevoznik delete(Long id);
	Prevoznik update(Prevoznik prevoznik);
	Page<Prevoznik> search(String naziv, String pib, int pageNo);

}
