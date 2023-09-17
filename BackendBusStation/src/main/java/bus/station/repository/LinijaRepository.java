package bus.station.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import bus.station.model.Linija;

@Repository
public interface LinijaRepository extends JpaRepository<Linija, Long>{
	
	Linija findOneById(Long id);
	
	@Query("SELECT l FROM Linija l WHERE" +
			"(:prevoznikId = NULL OR l.prevoznik.id = :prevoznikId) AND " + 
			"(:destinacija = NULL OR l.destinacija LIKE :destinacija)")
	Page<Linija> search(@Param("prevoznikId") Long prevoznikId, @Param("destinacija") String destinacija, Pageable pageable);

}
