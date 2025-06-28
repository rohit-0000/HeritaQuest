package com.herita.quest.Entity;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class EmailRequest {
    private String username;
    private String to;
    private String subject;
    private String body;
}
