#!/bin/bash

# Script para remover imports do earth e blocos staticFigure das páginas de pesquisadores
# Deixar apenas a pequena figura da Terra no box2

find src/pages/Researchers/Personal_pages -name "*.tsx" -exec sed -i '' \
    -e '/import earth from/d' \
    -e '/div className={styles\.staticFigure}/,+2d' {} \;