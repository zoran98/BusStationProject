package bus.station.support;

import java.util.ArrayList;
import java.util.List;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import bus.station.model.Linija;
import bus.station.web.dto.LinijaDTO;

@Component
public class LinijaToLinijaDto implements Converter<Linija, LinijaDTO>{

	@Override
	public LinijaDTO convert(Linija l) {
		
		LinijaDTO dto = new LinijaDTO();
		dto.setId(l.getId());
		dto.setBrojMesta(l.getBrojMesta());
		dto.setCenaKarte(l.getCenaKarte());
		dto.setVremePolaska(l.getVremePolaska());
		dto.setDestinacija(l.getDestinacija());
		dto.setPrevoznikId(l.getPrevoznik().getId());
		dto.setPrevoznikNaziv(l.getPrevoznik().getNaziv());
		
		return dto;
	}
	
	public List<LinijaDTO> convert(List<Linija> linije){
		
		List<LinijaDTO> dto = new ArrayList<LinijaDTO>();
		
		for(Linija l: linije) {
			dto.add(convert(l));
		}
		return dto;
		
	}

}
