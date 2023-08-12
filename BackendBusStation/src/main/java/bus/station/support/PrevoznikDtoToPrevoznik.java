package bus.station.support;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import bus.station.model.Prevoznik;
import bus.station.service.PrevoznikService;
import bus.station.web.dto.PrevoznikDTO;

@Component
public class PrevoznikDtoToPrevoznik implements Converter<PrevoznikDTO, Prevoznik>{
	
	@Autowired
	private PrevoznikService prevoznikService;

	@Override
	public Prevoznik convert(PrevoznikDTO pDTO) {
		Prevoznik p;
		if(pDTO.getId() == null) {
			p = new Prevoznik();
		}else {
			p = prevoznikService.findOne(pDTO.getId());
		}
		
		if(p != null) {
			p.setNaziv(pDTO.getNaziv());
			p.setAdresa(pDTO.getAdresa());
			p.setPib(pDTO.getPib());
		}
		return p;
	}

}
