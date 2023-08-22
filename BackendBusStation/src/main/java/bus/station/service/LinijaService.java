package bus.station.service;

import org.springframework.data.domain.Page;

import bus.station.model.Linija;

public interface LinijaService {
	
	Linija findOne(Long id);
	Page<Linija> findAll(int pageNo);

}
