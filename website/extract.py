# -*- coding: utf-8 -*-
import pdfplumber

text = ''
with pdfplumber.open('제8회 대한민국 주거복지문화대상 제출 기관단체 공적 평가 종합 보고서.pdf') as pdf:
    for page in pdf.pages:
        extracted = page.extract_text()
        if extracted:
            text += extracted + '\n'

with open('pdf_content4.txt', 'w', encoding='utf-8') as f:
    f.write(text)
