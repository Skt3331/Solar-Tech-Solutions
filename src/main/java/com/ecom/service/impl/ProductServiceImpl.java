package com.ecom.service.impl;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import com.ecom.model.Product;
import com.ecom.repository.ProductRepository;
import com.ecom.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService {

	@Autowired
	private ProductRepository productRepository;

	@Override
	public Product saveProduct(Product product) {
		return productRepository.save(product);
	}

	@Override
	public List<Product> getAllProducts() {
		return productRepository.findAll();
	}

	@Override
	public Page<Product> getAllProductsPagination(Integer pageNo, Integer pageSize) {
		Pageable pageable = PageRequest.of(pageNo, pageSize);
		return productRepository.findAll(pageable);
	}

	@Override
	public Boolean deleteProduct(Integer id) {
		Product product = productRepository.findById(id).orElse(null);

		if (!ObjectUtils.isEmpty(product)) {
			productRepository.delete(product);
			return true;
		}
		return false;
	}

	@Override
	public Product getProductById(Integer id) {
		Product product = productRepository.findById(id).orElse(null);
		return product;
	}

	@Override
	public Product updateProduct(Product product, MultipartFile image) {

		Product dbProduct = getProductById(product.getId());

		String imageName = image.isEmpty() ? dbProduct.getImage() : image.getOriginalFilename();

		dbProduct.setTitle(product.getTitle());
		dbProduct.setDescription(product.getDescription());
		dbProduct.setCategory(product.getCategory());
		dbProduct.setPrice(product.getPrice());
		dbProduct.setStock(product.getStock());
		dbProduct.setImage(imageName);
		dbProduct.setIsActive(product.getIsActive());
		dbProduct.setDiscount(product.getDiscount());
		
		// Preserve the existing average rating if not provided in the update
		if (product.getAverageRating() != null) {
		    dbProduct.setAverageRating(product.getAverageRating());
		}
		
		// Update cell count if provided, otherwise preserve existing
		if (product.getCellCount() != null) {
		    dbProduct.setCellCount(product.getCellCount());
		}
		
		// Update efficiency if provided, otherwise preserve existing
		if (product.getEfficiency() != null) {
		    dbProduct.setEfficiency(product.getEfficiency());
		}
		
		// Update maximum power current if provided, otherwise preserve existing
		if (product.getMaximumPowerCurrent() != null) {
		    dbProduct.setMaximumPowerCurrent(product.getMaximumPowerCurrent());
		}
		
		// Update maximum power voltage if provided, otherwise preserve existing
		if (product.getMaximumPowerVoltage() != null) {
		    dbProduct.setMaximumPowerVoltage(product.getMaximumPowerVoltage());
		}
		
		// Update technical specifications if provided, otherwise preserve existing
		if (product.getMaximumSystemVoltage() != null) dbProduct.setMaximumSystemVoltage(product.getMaximumSystemVoltage());
		if (product.getOpenCircuitVoltage() != null) dbProduct.setOpenCircuitVoltage(product.getOpenCircuitVoltage());
		if (product.getShortCircuitCurrent() != null) dbProduct.setShortCircuitCurrent(product.getShortCircuitCurrent());
		if (product.getOperatingTemperature() != null) dbProduct.setOperatingTemperature(product.getOperatingTemperature());
		if (product.getTemperatureCoefficient() != null) dbProduct.setTemperatureCoefficient(product.getTemperatureCoefficient());
		if (product.getNominalOperatingCellTemperature() != null) dbProduct.setNominalOperatingCellTemperature(product.getNominalOperatingCellTemperature());
		if (product.getPeakPowerOutput() != null) dbProduct.setPeakPowerOutput(product.getPeakPowerOutput());
		if (product.getModuleEfficiency() != null) dbProduct.setModuleEfficiency(product.getModuleEfficiency());
		if (product.getWattage() != null) dbProduct.setWattage(product.getWattage());
		if (product.getWeight() != null) dbProduct.setWeight(product.getWeight());
		
		// Update string properties if provided, otherwise preserve existing
		if (product.getBacksheetMaterial() != null) dbProduct.setBacksheetMaterial(product.getBacksheetMaterial());
		if (product.getCableLength() != null) dbProduct.setCableLength(product.getCableLength());
		if (product.getCellType() != null) dbProduct.setCellType(product.getCellType());
		if (product.getCertifications() != null) dbProduct.setCertifications(product.getCertifications());
		if (product.getConnectorType() != null) dbProduct.setConnectorType(product.getConnectorType());
		if (product.getDimensions() != null) dbProduct.setDimensions(product.getDimensions());
		if (product.getFrameType() != null) dbProduct.setFrameType(product.getFrameType());
		if (product.getImageUrl() != null) dbProduct.setImageUrl(product.getImageUrl());
		if (product.getInstallationType() != null) dbProduct.setInstallationType(product.getInstallationType());
		if (product.getInverterCompatibility() != null) dbProduct.setInverterCompatibility(product.getInverterCompatibility());
		if (product.getJunctionBoxType() != null) dbProduct.setJunctionBoxType(product.getJunctionBoxType());
		if (product.getManufacturer() != null) dbProduct.setManufacturer(product.getManufacturer());
		if (product.getWarranty() != null) dbProduct.setWarranty(product.getWarranty());
		
		// Update integer properties if provided, otherwise preserve existing
		if (product.getStockQuantity() != null) dbProduct.setStockQuantity(product.getStockQuantity());
		if (product.getTotalReviews() != null) dbProduct.setTotalReviews(product.getTotalReviews());

		// 5=100*(5/100); 100-5=95
		Double disocunt = product.getPrice() * (product.getDiscount() / 100.0);
		Double discountPrice = product.getPrice() - disocunt;
		dbProduct.setDiscountPrice(discountPrice);

		Product updateProduct = productRepository.save(dbProduct);

		if (!ObjectUtils.isEmpty(updateProduct)) {

			if (!image.isEmpty()) {

				try {
					File saveFile = new ClassPathResource("static/img").getFile();

					Path path = Paths.get(saveFile.getAbsolutePath() + File.separator + "product_img" + File.separator
							+ image.getOriginalFilename());
					Files.copy(image.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			return product;
		}
		return null;
	}

	@Override
	public List<Product> getAllActiveProducts(String category) {
		List<Product> products = null;
		if (ObjectUtils.isEmpty(category)) {
			products = productRepository.findByIsActiveTrue();
		} else {
			products = productRepository.findByCategory(category);
		}

		return products;
	}

	@Override
	public List<Product> searchProduct(String ch) {
		return productRepository.findByTitleContainingIgnoreCaseOrCategoryContainingIgnoreCase(ch, ch);
	}

	@Override
	public Page<Product> searchProductPagination(Integer pageNo, Integer pageSize, String ch) {
		Pageable pageable = PageRequest.of(pageNo, pageSize);
		return productRepository.findByTitleContainingIgnoreCaseOrCategoryContainingIgnoreCase(ch, ch, pageable);
	}

	@Override
	public Page<Product> getAllActiveProductPagination(Integer pageNo, Integer pageSize, String category) {

		Pageable pageable = PageRequest.of(pageNo, pageSize);
		Page<Product> pageProduct = null;

		if (ObjectUtils.isEmpty(category)) {
			pageProduct = productRepository.findByIsActiveTrue(pageable);
		} else {
			pageProduct = productRepository.findByCategory(pageable, category);
		}
		return pageProduct;
	}

	@Override
	public Page<Product> searchActiveProductPagination(Integer pageNo, Integer pageSize, String category, String ch) {

		Page<Product> pageProduct = null;
		Pageable pageable = PageRequest.of(pageNo, pageSize);

		pageProduct = productRepository.findByIsActiveTrueAndTitleContainingIgnoreCaseOrCategoryContainingIgnoreCase(ch,
				ch, pageable);

//		if (ObjectUtils.isEmpty(category)) {
//			pageProduct = productRepository.findByIsActiveTrue(pageable);
//		} else {
//			pageProduct = productRepository.findByCategory(pageable, category);
//		}
		return pageProduct;
	}

}
