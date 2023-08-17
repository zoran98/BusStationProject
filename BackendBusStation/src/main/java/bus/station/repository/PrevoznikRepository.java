package bus.station.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import bus.station.model.Prevoznik;

@Repository
public interface PrevoznikRepository extends JpaRepository<Prevoznik, Long>{
	
	Prevoznik findOneById(Long id);
	
	@Query("SELECT p FROM Prevoznik p WHERE" +
			"(:naziv = NULL OR p.naziv LIKE :naziv) AND " +
			"(:pib = NULL OR p.pib LIKE :pib)")
	Page<Prevoznik> search(@Param("naziv") String naziv, @Param("pib") String pib, Pageable pageable);


}
