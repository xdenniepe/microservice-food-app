package com.yokai.core.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class ExternalLoginDTO {
    private  Integer externalId;
    private  Integer userId;
    private  String  email;
    private  String  type;
    private  String  status;
    private  String  sub;
	private Long dateDeleted;
}