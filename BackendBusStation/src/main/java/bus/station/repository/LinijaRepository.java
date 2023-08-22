package bus.station.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import bus.station.model.Linija;

@Repository
public interface LinijaRepository extends JpaRepository<Linija, Long>{
	
	Linija findOneById(Long id);

}
