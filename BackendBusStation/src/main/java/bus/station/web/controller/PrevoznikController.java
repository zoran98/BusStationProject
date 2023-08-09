package bus.station.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import bus.station.model.Prevoznik;
import bus.station.service.PrevoznikService;
import bus.station.support.PrevoznikToPrevoznikDto;
import bus.station.web.dto.PrevoznikDTO;

@RestController
@RequestMapping(value = "/api/prevoznici", produces = MediaType.APPLICATION_JSON_VALUE)
@Validated
public class PrevoznikController {
	
	@Autowired
	private PrevoznikService prevoznikService;
	
	@Autowired
	private PrevoznikToPrevoznikDto toPrevoznikDto;
	
//	@GetMapping
//	public ResponseEntity<List<PrevoznikDTO>> getAll(){
//		List<Prevoznik> as = prevoznikService.findAll();
//		
//		return new ResponseEntity<>(toPrevoznikDto.convert(as), HttpStatus.OK);
//	}
	
	//@PreAuthorize("hasRole('ROLE_KORISNIK', 'ROLE_ADMIN')")
		@GetMapping
		public ResponseEntity<List<PrevoznikDTO>> getAll(@RequestParam(value = "pageNo", defaultValue = "0") int pageNo){
			Page<Prevoznik> page = prevoznikService.findAll(pageNo);
			
			HttpHeaders headers = new HttpHeaders();
	        headers.add("Total-Pages", Integer.toString(page.getTotalPages()));

	        return new ResponseEntity<>(toPrevoznikDto.convert(page.getContent()),headers, HttpStatus.OK);
		}

}
