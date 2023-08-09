package bus.station.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "prevoznici")
public class Prevoznik {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false, unique = true)
	private String naziv;
	
	@Column
	private String adresa;
	
	@Column(nullable = false, unique = true)
	private String pib;
	
	@OneToMany(mappedBy = "prevoznik", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private List<Linija> linije = new ArrayList<Linija>();
	
	public Prevoznik() {
		super();
	}

	public Prevoznik(Long id, String naziv, String adresa, String pib, List<Linija> linije) {
		super();
		this.id = id;
		this.naziv = naziv;
		this.adresa = adresa;
		this.pib = pib;
		this.linije = linije;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNaziv() {
		return naziv;
	}

	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}

	public String getAdresa() {
		return adresa;
	}

	public void setAdresa(String adresa) {
		this.adresa = adresa;
	}

	public String getPib() {
		return pib;
	}

	public void setPib(String pib) {
		this.pib = pib;
	}

	public List<Linija> getLinije() {
		return linije;
	}

	public void setLinije(List<Linija> linije) {
		this.linije = linije;
	}
	
	public void addLinija(Linija linija) {
		this.linije.add(linija);
	}
	
	public void removeLinija(Long id) {
		for(Linija l: this.linije) {
			if(l.getId() == id) {
				this.linije.remove(l);
				return;
			}
		}
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Prevoznik other = (Prevoznik) obj;
		return Objects.equals(id, other.id);
	}

	@Override
	public String toString() {
		return "Prevoznik [id=" + id + ", naziv=" + naziv + ", adresa=" + adresa + ", pib=" + pib + "]";
	}
	
	

}
