package com.ecom.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(length = 500)
	private String title;

	@Column(length = 5000)
	private String description;

	private String category;

	private Double price;

	private int stock;

	private String image;

	private int discount;
	
	private Double discountPrice;
	
	@Column(name = "active")
	private Boolean isActive;
	
	@Column(name = "average_rating")
	private Double averageRating;
	
	@Column(name = "cell_count")
	private Integer cellCount;
	
	@Column(name = "efficiency")
	private Double efficiency;
	
	@Column(name = "maximum_power_current")
	private Double maximumPowerCurrent;
	
	@Column(name = "maximum_power_voltage")
	private Double maximumPowerVoltage;
	
	@Column(name = "maximum_system_voltage")
	private Double maximumSystemVoltage;
	
	@Column(name = "open_circuit_voltage")
	private Double openCircuitVoltage;
	
	@Column(name = "short_circuit_current")
	private Double shortCircuitCurrent;
	
	@Column(name = "operating_temperature")
	private Double operatingTemperature;
	
	@Column(name = "temperature_coefficient")
	private Double temperatureCoefficient;
	
	@Column(name = "nominal_operating_cell_temperature")
	private Double nominalOperatingCellTemperature;
	
	@Column(name = "peak_power_output")
	private Double peakPowerOutput;
	
	@Column(name = "module_efficiency")
	private Double moduleEfficiency;
	
	@Column(name = "wattage")
	private Double wattage;
	
	@Column(name = "weight")
	private Double weight;
	
	@Column(name = "backsheet_material")
	private String backsheetMaterial;
	
	@Column(name = "cable_length")
	private String cableLength;
	
	@Column(name = "cell_type")
	private String cellType;
	
	@Column(name = "certifications")
	private String certifications;
	
	@Column(name = "connector_type")
	private String connectorType;
	
	@Column(name = "dimensions")
	private String dimensions;
	
	@Column(name = "frame_type")
	private String frameType;
	
	@Column(name = "image_url")
	private String imageUrl;
	
	@Column(name = "installation_type")
	private String installationType;
	
	@Column(name = "inverter_compatibility")
	private String inverterCompatibility;
	
	@Column(name = "junction_box_type")
	private String junctionBoxType;
	
	@Column(name = "manufacturer")
	private String manufacturer;
	
	@Column(name = "warranty")
	private String warranty;
	
	@Column(name = "stock_quantity")
	private Integer stockQuantity;
	
	@Column(name = "total_reviews")
	private Integer totalReviews;
}
