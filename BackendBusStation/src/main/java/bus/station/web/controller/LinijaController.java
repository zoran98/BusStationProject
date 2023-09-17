package bus.station.web.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import bus.station.model.Linija;
import bus.station.service.LinijaService;
import bus.station.support.LinijaDtoToLinija;
import bus.station.support.LinijaToLinijaDto;
import bus.station.web.dto.LinijaDTO;

@RestController
@RequestMapping(value = "/api/linije", produces = MediaType.APPLICATION_JSON_VALUE)
@Validated
public class LinijaController {
	
	@Autowired
	private LinijaService linijaService;
	
	@Autowired
	private LinijaToLinijaDto toLinijaDto;
	
	@Autowired
	private LinijaDtoToLinija toLinija;
	
	//@PreAuthorize("hasRole('ROLE_KORISNIK', 'ROLE_ADMIN')")
	@GetMapping
	public ResponseEntity<List<LinijaDTO>> getAll(@RequestParam(value = "prevoznikId", required = false) Long prevoznikId,
			@RequestParam(value = "destinacija", required = false) String destinacija,
			@RequestParam(value = "pageNo", defaultValue = "0") int pageNo){

//		Page<Linija> page = linijaService.findAll(pageNo);
		Page<Linija> page = null;
        if(prevoznikId != null || destinacija != null) {
        	page = linijaService.search(prevoznikId, destinacija, pageNo);
        } else {
        	page = linijaService.findAll(pageNo);
        }

		HttpHeaders headers = new HttpHeaders();
		headers.add("Total-Pages", Integer.toString(page.getTotalPages()));

		return new ResponseEntity<>(toLinijaDto.convert(page.getContent()),headers, HttpStatus.OK);
	}
	
	//@PreAuthorize("hasAnyRole('ROLE_KORISNIK', 'ROLE_ADMIN')")
			@GetMapping("/{id}")
		    public ResponseEntity<LinijaDTO> getOne(@PathVariable Long id){
		        Linija linija = linijaService.findOne(id);

		        if(linija != null) {
		            return new ResponseEntity<>(toLinijaDto.convert(linija), HttpStatus.OK);
		        }else {
		            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		        }
		    }
	
	//@PreAuthorize("hasAnyRole('ROLE_KORISNIK', 'ROLE_ADMIN')")
	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<LinijaDTO> create(@Valid @RequestBody LinijaDTO linijaDTO){
        	Linija linija = toLinija.convert(linijaDTO);
        	Linija sacuvanaLinija = linijaService.save(linija);

        return new ResponseEntity<>(toLinijaDto.convert(sacuvanaLinija), HttpStatus.CREATED);
    }
	//@PreAuthorize("hasRole('ROLE_ADMIN')")
	@DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
		    Linija obrisanaLinija = linijaService.delete(id);

		    if(obrisanaLinija != null) {
		        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		     } else {
		        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		     }
	}
	
	//@PreAuthorize("hasAnyRole('ROLE_KORISNIK', 'ROLE_ADMIN')")
			@PutMapping(value = "/{id}",consumes = MediaType.APPLICATION_JSON_VALUE)
		    public ResponseEntity<LinijaDTO> update(@PathVariable Long id, @Valid @RequestBody LinijaDTO linijaDTO){

		        if(!id.equals(linijaDTO.getId())) {
		            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		        }

		        Linija linija = toLinija.convert(linijaDTO);
		        Linija sacuvanaLinija = linijaService.update(linija);

		        return new ResponseEntity<>(toLinijaDto.convert(sacuvanaLinija),HttpStatus.OK);
		    }

}
