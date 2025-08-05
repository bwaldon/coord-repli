# Code developed with the assistance of AI tools

import json
import re
from typing import List, Dict, Optional

def extract_text_from_file(file_path: str) -> str:
    """Extract text from text file."""
    with open(file_path, 'r', encoding='utf-8') as file:
        return file.read()

def parse_scenario_section(section_text: str) -> Dict:
    """Parse a single scenario section into structured data."""
    lines = [line.strip() for line in section_text.split('\n') if line.strip()]
    
    # Find scenario name (first line)
    scenario_name = lines[0].lower()
    
    # Find header (everything until first bracketed condition)
    header_lines = []
    condition_start_idx = 0
    
    for i, line in enumerate(lines[1:], 1):
        if line.startswith('[') and ']' in line:
            condition_start_idx = i
            break
        header_lines.append(line)
    
    header = ' '.join(header_lines).strip()
    
    # Parse conditions
    conditions = []
    current_condition = None
    current_text = []
    question_line = None
    
    for i in range(condition_start_idx, len(lines)):
        line = lines[i]
        
        # Check if this is a condition marker
        if line.startswith('[') and ']' in line:
            # Save previous condition if exists
            if current_condition:
                conditions.append({
                    'condition': current_condition['condition'],
                    'blocks': current_condition['blocks'],
                    'text': ' '.join(current_text).strip()
                })
            
            # Parse new condition
            bracket_content = line[line.find('[')+1:line.find(']')]
            parts = bracket_content.split(';')
            condition_type = parts[0].strip().lower()
            blocks_part = parts[1].strip() if len(parts) > 1 else ""
            
            # Extract block numbers
            block_numbers = []
            if 'Block' in blocks_part:
                # Extract all numbers from the blocks part, regardless of singular/plural
                numbers = re.findall(r'\d+', blocks_part)
                block_numbers = [int(n) for n in numbers]
            
            current_condition = {
                'condition': condition_type,
                'blocks': block_numbers
            }
            current_text = []
            
            # Add text after the bracket on the same line
            remaining_text = line[line.find(']')+1:].strip()
            if remaining_text:
                current_text.append(remaining_text)
        
        elif line.startswith('Did (') and line.endswith('break the rule?'):
            question_line = line
        elif line in ['• YES', '• NO']:
            continue  # Skip answer options
        else:
            # Regular text line
            if current_condition and not line.startswith('•'):
                current_text.append(line)
    
    # Don't forget the last condition
    if current_condition:
        conditions.append({
            'condition': current_condition['condition'],
            'blocks': current_condition['blocks'],
            'text': ' '.join(current_text).strip()
        })
    
    # Extract names from the question
    names = []
    if question_line:
        # Extract content within parentheses
        match = re.search(r'Did \(([^)]+)\)', question_line)
        if match:
            names_text = match.group(1)
            # Split by / and clean up
            names = [name.strip() for name in names_text.split('/')]
    
    return {
        'scenario_name': scenario_name,
        'header': header,
        'conditions': conditions,
        'names': names
    }

def create_json_entries(scenarios: List[Dict]) -> List[Dict]:
    """Convert parsed scenarios into the required JSON format."""
    entries = []
    
    for scenario in scenarios:
        scenario_name = scenario['scenario_name']
        header = scenario['header']
        names = scenario['names']
        
        # Map condition types to name indices
        condition_to_name_idx = {
            'violation': 0,
            'overinclusion': 1,
            'underinclusion': 2,
            'compliance': 3
        }
        
        for condition in scenario['conditions']:
            condition_type = condition['condition']
            blocks = condition['blocks']
            text = condition['text']
            
            # Get the appropriate name for this condition
            name_idx = condition_to_name_idx.get(condition_type, 0)
            character_name = names[name_idx] if name_idx < len(names) else "Unknown"
            
            # Create entries for each block
            for block in blocks:
                entry = {
                    "block": block,
                    "scenario": scenario_name,
                    "header": header,
                    "condition": condition_type,
                    "continuation": text,
                    "name": character_name
                }
                entries.append(entry)
    
    return entries

def extract_scenarios_from_text(text: str) -> List[Dict]:
    """Extract all scenarios from the text."""
    # Split by scenario titles - looking for single capitalized words at the start of lines
    scenario_pattern = r'^([A-Z][a-z]+)\s*$'
    
    sections = []
    current_section = []
    
    lines = text.split('\n')
    
    for line in lines:
        line_stripped = line.strip()
        if not line_stripped:
            continue
            
        # Check if this line is a scenario title
        if re.match(scenario_pattern, line_stripped) and len(line_stripped.split()) == 1:
            # Save previous section
            if current_section:
                sections.append('\n'.join(current_section))
            # Start new section
            current_section = [line_stripped]
        else:
            current_section.append(line)
    
    # Don't forget the last section
    if current_section:
        sections.append('\n'.join(current_section))
    
    # Parse each section
    scenarios = []
    for section in sections:
        if section.strip():
            try:
                scenario = parse_scenario_section(section)
                scenarios.append(scenario)
                print(f"Parsed scenario: {scenario['scenario_name']} with {len(scenario['conditions'])} conditions")
            except Exception as e:
                print(f"Warning: Failed to parse scenario section: {e}")
                print(f"Section content: {section[:200]}...")
    
    return scenarios

def main(text_file_path: str, output_path: str = "../experiment/server/src/stims.json"):
    """Main function to extract text file data and save as JSON."""
    try:
        # Extract text from file
        print("Reading text from file...")
        text = extract_text_from_file(text_file_path)
        
        # Extract scenarios
        print("Parsing scenarios...")
        scenarios = extract_scenarios_from_text(text)
        
        print(f"Found {len(scenarios)} scenarios")
        
        # Create JSON entries
        print("Creating JSON entries...")
        json_entries = create_json_entries(scenarios)
        
        print(f"Created {len(json_entries)} JSON entries")
        
        # Save to JSON file
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(json_entries, f, indent=2, ensure_ascii=False)
        
        print(f"Data saved to {output_path}")
        
        # Print sample entries for verification
        if json_entries:
            print("\nSample entries:")
            for i, entry in enumerate(json_entries[:3]):  # Show first 3 entries
                print(f"\nEntry {i+1}:")
                print(json.dumps(entry, indent=2))
        
        # Print summary by scenario
        print("\nSummary by scenario:")
        scenario_counts = {}
        for entry in json_entries:
            scenario = entry['scenario']
            if scenario not in scenario_counts:
                scenario_counts[scenario] = 0
            scenario_counts[scenario] += 1
        
        for scenario, count in scenario_counts.items():
            print(f"  {scenario}: {count} entries")
        
        return json_entries
        
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()
        return None

if __name__ == "__main__":
    # Usage example
    text_file_path = "materials.txt"
    
    # Run the extraction
    results = main(text_file_path)
    
    if results:
        print(f"\nSuccessfully extracted {len(results)} entries")
    else:
        print("Extraction failed")