package com.yokai.core.utility;

import java.util.UUID;
import java.text.DecimalFormat;
import java.time.*;

public class Utility {
  public int age = 0;
  
	/*
	 * generateGUID
	 */
	public static String generateUUID() {
		UUID uuid = UUID.randomUUID();
		return uuid.toString();
	}

	/*
	 * convertLocalDateToLong()
	 */
	public static Long convertLocalDateToLong(LocalDateTime datetime) {
		return datetime.toEpochSecond(ZoneOffset.UTC);
	}

	public static Double formatDouble(double x, int decimalPlaces) {

		StringBuilder bld = new StringBuilder("###.");
		
		for (int y=0; y<decimalPlaces; y++) {
			bld.append("#");
		}

		DecimalFormat   df    = new DecimalFormat(bld.toString());

		return Double.valueOf(df.format(x));
	}
	
}
