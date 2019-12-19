package bit.yam.model;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.ColumnDefault;

import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class Users {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int userNo;
	
	@Column
	private int level;
	
	@Column
	private int gender;
	
	@Column
	private int userStatus;
	
	@Column
	private int violation;
	
	@Column
	private int reasonCode;
	
	@Column
	private String userID;
	
	@Column
	private String nickname;
	
	@Column
	private LocalDate birthday;
	
	@Column
	private int age;
	
	@Column
	private String phone;
	
	@Column
	private String profileImg;
	
	@Column
	private int shareLocation;
	
	@Column
	private LocalDate regDate;
	
	@Column
	private int wtCount;
}
