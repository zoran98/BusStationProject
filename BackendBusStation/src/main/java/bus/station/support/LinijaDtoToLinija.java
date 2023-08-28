package bus.station.support;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import bus.station.model.Linija;
import bus.station.service.LinijaService;
import bus.station.service.PrevoznikService;
import bus.station.web.dto.LinijaDTO;

@Component	
public class LinijaDtoToLinija implements Converter<LinijaDTO, Linija>{
	
	@Autowired
	private LinijaService linijaService;
	
	@Autowired
	private PrevoznikService prevoznikService;

	@Override
	public Linija convert(LinijaDTO dto) {
		Linija l;
		if(dto.getId() == null) {
			l = new Linija();
		} else {
			l = linijaService.findOne(dto.getId());
		}
		
		if(l != null) {
			l.setBrojMesta(dto.getBrojMesta());
			l.setCenaKarte(dto.getCenaKarte());
			l.setVremePolaska(dto.getVremePolaska());
			l.setDestinacija(dto.getDestinacija());
			l.setPrevoznik(prevoznikService.findOne(dto.getPrevoznikId()));
		}
		return l;
	}

}
