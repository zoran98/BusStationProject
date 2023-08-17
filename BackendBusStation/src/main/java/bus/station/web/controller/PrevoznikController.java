package bus.station.web.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

import bus.station.model.Prevoznik;
import bus.station.service.PrevoznikService;
import bus.station.support.PrevoznikDtoToPrevoznik;
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
	
	@Autowired
	private PrevoznikDtoToPrevoznik toPrevoznik;
	
//	@GetMapping
//	public ResponseEntity<List<PrevoznikDTO>> getAll(){
//		List<Prevoznik> as = prevoznikService.findAll();
//		
//		return new ResponseEntity<>(toPrevoznikDto.convert(as), HttpStatus.OK);
//	}
	
	//@PreAuthorize("hasRole('ROLE_KORISNIK', 'ROLE_ADMIN')")
		@GetMapping
		public ResponseEntity<List<PrevoznikDTO>> getAll(@RequestParam(value = "naziv", required = false) String naziv,
				@RequestParam(value = "pib", required = false) String pib,
				@RequestParam(value = "pageNo", defaultValue = "0") int pageNo){
		//	Page<Prevoznik> page = prevoznikService.findAll(pageNo);
			
			Page<Prevoznik> page = null;
			if(naziv != null || pib != null) {
				page = prevoznikService.search(naziv, pib, pageNo);
			}else {
				page = prevoznikService.findAll(pageNo);
			}
			
			HttpHeaders headers = new HttpHeaders();
	        headers.add("Total-Pages", Integer.toString(page.getTotalPages()));

	        return new ResponseEntity<>(toPrevoznikDto.convert(page.getContent()),headers, HttpStatus.OK);
		}
		
		//@PreAuthorize("hasAnyRole('ROLE_KORISNIK', 'ROLE_ADMIN')")
				@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
			    public ResponseEntity<PrevoznikDTO> create(@Valid @RequestBody PrevoznikDTO prevoznikDTO){
			        Prevoznik prevoznik = toPrevoznik.convert(prevoznikDTO);
			       Prevoznik sacuvanPrevoznik = prevoznikService.save(prevoznik);

			        return new ResponseEntity<>(toPrevoznikDto.convert(sacuvanPrevoznik), HttpStatus.CREATED);
			    }
				
				@PreAuthorize("hasRole('ROLE_ADMIN')")
				@DeleteMapping("/{id}")
			    public ResponseEntity<Void> delete(@PathVariable Long id){
			        Prevoznik obrisanPrevoznik = prevoznikService.delete(id);

			        if(obrisanPrevoznik != null) {
			            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			        } else {
			            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			        }
			    }
				
				@PreAuthorize("hasAnyRole('ROLE_KORISNIK', 'ROLE_ADMIN')")
				@PutMapping(value = "/{id}",consumes = MediaType.APPLICATION_JSON_VALUE)
			    public ResponseEntity<PrevoznikDTO> update(@PathVariable Long id, @Valid @RequestBody PrevoznikDTO prevoznikDTO){

			        if(!id.equals(prevoznikDTO.getId())) {
			            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			        }

			        Prevoznik prevoznik = toPrevoznik.convert(prevoznikDTO);
			        Prevoznik sacuvanPrevoznik = prevoznikService.update(prevoznik);

			        return new ResponseEntity<>(toPrevoznikDto.convert(sacuvanPrevoznik),HttpStatus.OK);
			    }
				//@PreAuthorize("hasAnyRole('ROLE_KORISNIK', 'ROLE_ADMIN')")
				@GetMapping("/{id}")
			    public ResponseEntity<PrevoznikDTO> getOne(@PathVariable Long id){
			        Prevoznik prevoznik = prevoznikService.findOne(id);

			        if(prevoznik != null) {
			            return new ResponseEntity<>(toPrevoznikDto.convert(prevoznik), HttpStatus.OK);
			        }else {
			            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			        }
			    }

}
