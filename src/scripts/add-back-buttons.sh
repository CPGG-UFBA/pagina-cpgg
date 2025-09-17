#!/bin/bash

# Script to add back buttons to all remaining researcher pages
echo "Adding back buttons to remaining researcher pages..."

# List of remaining researchers
researchers=(
  "LCesar"
  "LRogerio" 
  "Landim"
  "MZucchi"
  "Marilia"
  "Reynam"
  "RicardoM"
  "Ruy"
  "Simone"
  "Susana"
  "Wilson"
  "Alanna"
  "Alexandre"
  "Alexsandro"
  "Amin"
  "AnaV"
  "Angela"
  "Aroldo"
  "Arthur"
  "Camila"
)

echo "Processing ${#researchers[@]} researcher pages..."

for researcher in "${researchers[@]}"; do
  echo "Processing $researcher..."
  
  # Update import in index.tsx
  file_path="src/pages/Researchers/Personal_pages/$researcher/index.tsx"
  if [ -f "$file_path" ]; then
    # Add BackButton import if not already present
    if ! grep -q "BackButton" "$file_path"; then
      sed -i '5a import { BackButton } from "../../../../components/BackButton"' "$file_path"
    fi
    
    # Add BackButton to JSX if not already present  
    if ! grep -q "<BackButton" "$file_path"; then
      sed -i 's/<div className={styles\.Professor} >/<div className={styles.Professor} >\n          <BackButton \/>/' "$file_path"
    fi
    
    echo "Updated $researcher"
  else  
    echo "Warning: $file_path not found"
  fi
done

echo "Completed adding back buttons to all researcher pages!"