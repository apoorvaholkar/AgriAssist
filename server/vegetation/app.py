from flask import Flask, request, jsonify, render_template, send_file
from flask import request as req
from flask_cors import CORS
from flask_cors import cross_origin
from sentinelhub import SHConfig, SentinelHubStatistical, BBox, Geometry, DataCollection, CRS
import json
from datetime import datetime
import matplotlib
matplotlib.use('Agg')  # Required for non-interactive backend
import matplotlib.pyplot as plt
import pandas as pd
import os
from werkzeug.utils import secure_filename

import random
app = Flask(__name__)
CORS(app)   # Enable CORS for all routes


GLOBAL_DATA_FILE = r"C:/Users/Apoorva/Documents/VIT/Major Project/Bhoomi/Bhoomi-main/client/public/global_data.json"
FORM_DATA_FILE = r"C:/Users/Apoorva/Documents/VIT/Major Project/Bhoomi/Bhoomi-main/client/public/form_data.json"
LOAN_APPLICATION_FILE = r"C:/Users/Apoorva/Documents/VIT/Major Project/Bhoomi/Bhoomi-main/client/public/loan_data.json"


# Configuration for Sentinel Hub
# Your existing configuration and variables here
config = SHConfig()
config.sh_client_id = 'db0acfc2-e952-484e-8ee3-5eb450a32a56'
config.sh_client_secret = 'EiNkMgCQl3MlUktuOkYpeKwKwKBEV9Sh'

evalscript = """

//VERSION=3
function setup() {
  return {
    input: [{
      bands: [
        "B02",
        "B04",
        "B08",
        "B11",
        "SCL",
        "CLM",
        "dataMask"
      ]
    }],
    output: [
      {
        id: "ndvi",
        bands: ["NDVI"]
      },
      {
        id: "bsi",
        bands: ["BSI"]
      },
      {
        id: "dataMask",
        bands: 1
      }]
  }
}

function evaluatePixel(samples) {
    let ndvi = (samples.B08 - samples.B04)/(samples.B08 + samples.B04)
    let bsi = ((samples.B11 + samples.B04)-(samples.B08 + samples.B02))/((samples.B11 + samples.B04)+(samples.B08 + samples.B02));
     
    var validNDVIMask = 1
    if (samples.B08 + samples.B04 + samples.B11 + samples.B02 == 0 ){
        validNDVIMask = 0
    }

    var noWaterMask = 1
    if (samples.SCL == 6 ){
        noWaterMask = 0
    }

    return {
        ndvi: [ndvi],
        bsi: [bsi],
        // Exclude nodata pixels, pixels where ndvi is not defined and water pixels from statistics:
        dataMask: [samples.dataMask * validNDVIMask * noWaterMask]
    }
}
"""

# Local Credit Form Data
@app.route('/local', methods=['POST'])
@cross_origin()
def save_form_data():
    try:
        # Get JSON data from the request
        form_data = req.get_json()
        
        form_data['local_credit_score'] = random.randint(50, 100)
        # Add a timestamp to the form data
        form_data['timestamp'] = datetime.now().isoformat()

        # Check if the file exists
        DATA_FILE = r"C:/Users/Apoorva/Documents/VIT/Major Project/Bhoomi/Bhoomi-main/client/public/form_data.json"
        if os.path.exists(DATA_FILE):
            # If the file exists, append the new data
            with open(DATA_FILE, 'r') as file:
                existing_data = json.load(file)
        else:
            # If the file does not exist, initialize an empty list
            existing_data = []

        # Append the new form data
        existing_data.append(form_data)

        # Save the updated data back to the file
        with open(DATA_FILE, 'w') as file:
            json.dump(existing_data, file, indent=4)

        return jsonify({"message": "Form data saved successfully!"}), 200

    except Exception as e:
        print("Error saving form data:", e)
        return jsonify({"message": "Failed to save form data", "error": str(e)}), 500




#Global Credit Form Data
@app.route('/global', methods=['POST'])
@cross_origin()
def save_global_data():
    try:
        # Get JSON data from the request
        global_data = req.get_json()
        global_data['global_credit_score'] = random.randint(50, 100)
        # Add a timestamp to the global data
        global_data['timestamp'] = datetime.now().isoformat()

        # Check if the file exists
        DATA_FILE = r"C:/Users/Apoorva/Documents/VIT/Major Project/Bhoomi/Bhoomi-main/client/public/global_data.json"
        if os.path.exists(DATA_FILE):
            # If the file exists, append the new data
            with open(DATA_FILE, 'r') as file:
                existing_data = json.load(file)
        else:
            # If the file does not exist, initialize an empty list
            existing_data = []

        # Append the new global data
        existing_data.append(global_data)

        # Save the updated data back to the file
        with open(DATA_FILE, 'w') as file:
            json.dump(existing_data, file, indent=4)

        return jsonify({"message": "Global data saved successfully!"}), 200

    except Exception as e:
        print("Error saving global data:", e)
        return jsonify({"message": "Failed to save global data", "error": str(e)}), 500



#Loan Application
@app.route('/submit-loan', methods=['POST'])
@cross_origin()
def submit_loan_application():
    try:
        # Get the form data from the request
        form_data = req.get_json()
        aadhar_number = form_data.get('aadharNumber')

        # Validate Aadhar number is provided
        if not aadhar_number:
            return jsonify({"message": "Aadhar number is required."}), 400

        # Load data from both files
        if os.path.exists(GLOBAL_DATA_FILE):
            with open(GLOBAL_DATA_FILE, 'r') as file:
                global_data = json.load(file)
        else:
            global_data = []

        if os.path.exists(FORM_DATA_FILE):
            with open(FORM_DATA_FILE, 'r') as file:
                form_data_list = json.load(file)
        else:
            form_data_list = []

        # Search for matching Aadhar number in both files
        global_entry = next((entry for entry in global_data if entry.get('aadharNumber') == aadhar_number), None)
        form_entry = next((entry for entry in form_data_list if entry.get('aadharNumber') == aadhar_number), None)

        if not global_entry and not form_entry:
            return jsonify({"message": "Aadhar number not found in both files."}), 404
        elif not global_entry:
            return jsonify({"message": "Aadhar number not found in global_data.json."}), 404
        elif not form_entry:
            return jsonify({"message": "Aadhar number not found in form_data.json."}), 404

         # Extract specific fields from form_data
        bank_name = form_data.get('bankName')
        loan_amount = form_data.get('loanAmount')
        repayment_months = form_data.get('repaymentMonths')

        # Merge data from both entries and include selected form_data fields
        merged_data = {
            **global_entry,
            **form_entry,
            "bankName": bank_name,          # Add bankName from form_data
            "loanAmount": loan_amount,      # Add loanAmount from form_data
            "repaymentMonths": repayment_months, # Add repaymentMonths from form_data
            "loanStatus": "Pending"        # Add loan_status field
        }

        # Save the merged data to the loan_application.json file
        if os.path.exists(LOAN_APPLICATION_FILE):
            with open(LOAN_APPLICATION_FILE, 'r') as file:
                loan_data = json.load(file)
        else:
            loan_data = []

        # Append the merged entry
        loan_data.append(merged_data)

        with open(LOAN_APPLICATION_FILE, 'w') as file:
            json.dump(loan_data, file, indent=4)

        return jsonify({"message": "Loan application submitted successfully.", "data": merged_data}), 200

    except Exception as e:
        print("Error processing loan application:", e)
        return jsonify({"message": "An error occurred.", "error": str(e)}), 500


# Get the latest loan applications
@app.route('/admin/loan-applications', methods=['GET'])
def get_latest_loan_applications():
    try:
        if os.path.exists(LOAN_APPLICATION_FILE):
            with open(LOAN_APPLICATION_FILE, 'r') as file:
                loan_data = json.load(file)
        else:
            loan_data = []

        # Filter the latest entry for each Aadhar number
        unique_entries = {}
        for entry in loan_data:
            aadhar = entry.get('aadharNumber')
            if aadhar:
                if aadhar not in unique_entries or unique_entries[aadhar]['timestamp'] < entry.get('timestamp', 0):
                    unique_entries[aadhar] = entry

        return jsonify({"message": "Loan applications retrieved successfully.", "data": list(unique_entries.values())}), 200

    except Exception as e:
        print("Error retrieving loan applications:", e)
        return jsonify({"message": "An error occurred.", "error": str(e)}), 500
    

@app.route('/admin/update-loan-status', methods=['POST'])
def update_loan_status():
    try:
        data = request.get_json()
        aadhar_number = data.get('aadharNumber')
        status = data.get('status')
        review_message = data.get('reviewMessage', "")

        if not aadhar_number or not status:
            return jsonify({"message": "Aadhar number and status are required."}), 400

        if os.path.exists(LOAN_APPLICATION_FILE):
            with open(LOAN_APPLICATION_FILE, 'r') as file:
                loan_data = json.load(file)
        else:
            return jsonify({"message": "Loan application file not found."}), 404

        for application in loan_data:
            if application.get('aadharNumber') == aadhar_number:
                application['loanStatus'] = status
                if status == "Reverted":
                    application['reviewMessage'] = review_message
                break
        else:
            return jsonify({"message": "Loan application not found."}), 404

        with open(LOAN_APPLICATION_FILE, 'w') as file:
            json.dump(loan_data, file, indent=4)

        return jsonify({"message": f"Loan status updated to {status} successfully."}), 200

    except Exception as e:
        print("Error updating loan status:", e)
        return jsonify({"message": "An error occurred.", "error": str(e)}), 500




# Function to generate NDVI graph
def generate_ndvi_graph(response_data):
    """Generate NDVI graph from response data and save it as PNG"""
    date = []
    Mean = []
    Min = []
    Max = []

    # Extract data from response
    intervals = response_data[0]['data']
    
    for data_item in intervals:
        ndvi_stats = data_item['outputs']['ndvi']['bands']['NDVI']['stats']
        date.append(data_item['interval']['to'][:10])  # Get date and trim to YYYY-MM-DD
        Mean.append(ndvi_stats['mean'])
        Max.append(ndvi_stats['max'])
        Min.append(ndvi_stats['min'])

    # Create DataFrame
    elements = {
        'Date': date,
        'Mean': Mean,
        'Max': Max,
        'Min': Min
    }
    table = pd.DataFrame(elements)

    # Create the plot
    matplotlib.rcParams.update({'font.size': 16})
    fig, ax = plt.subplots()
    fig.set_size_inches(20, 8)
    ax.ticklabel_format(style='plain')

    # Plot lines
    line1 = table.plot(color='#4d6600', alpha=0.3, kind='line', x='Date', y='Max', 
                      ax=ax, label='Maximum NDVI', linewidth=6)
    line2 = table.plot(color='#739900', kind='line', x='Date', y='Mean', 
                      ax=ax, label='Mean NDVI', linewidth=6, marker='o', markersize=15)
    line3 = table.plot(color='#99cc00', alpha=0.3, kind='line', x='Date', y='Min', 
                      ax=ax, label='Minimum NDVI', linewidth=6)

    # Fill between max and min
    plt.fill_between(table['Date'], table['Max'], table['Min'], color='#99cc00', alpha=0.1)

    # Customize plot
    plt.xlabel('Date')
    plt.ylabel('NDVI value')
    plt.title('NDVI')
    plt.legend(loc='best', bbox_to_anchor=(0.5, 0.2, 0.45, 0.2), shadow=True, prop={'size': 18})

    # Create static directory if it doesn't exist
    os.makedirs('static', exist_ok=True)
    
    # Generate unique filename using timestamp
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    filename = f'ndvi_plot.png'
    plot_path = os.path.join('static', secure_filename(filename))
    
    # Save the plot
    plt.savefig(plot_path)
    plt.close()  # Close the figure to free memory
    return plot_path



def save_report_to_file(report_data):
    """
    Save the processed report data to a file named 'output'.
    If the file exists, it will be overwritten.
    """
    try:
        # Define the output file path
        file_path = r"C:/Users/Apoorva/Documents/VIT/Major Project/Bhoomi/Bhoomi-main/client/public/output.json"
        
        # Serialize the report data to a JSON string for better readability
        report_json = json.dumps(report_data, indent=4)
        
        # Write the data to the file
        with open(file_path, "w") as file:
            file.write(report_json)
        
        print(f"Report successfully written to {file_path}")
    except Exception as e:
        print(f"Error saving report to file: {e}")



@app.route('/getveg', methods=['POST'])
@cross_origin()

def get_veg():
    try:
        # Extract data from the request
        print(req.get_json())
        coordinates = req.json.get('coordinates')
        fromDate = req.json.get('fromDate')
        toDate = req.json.get('toDate')
        print("Coordinates: ", coordinates, "time:", fromDate, toDate)
        timeInterval = (fromDate, toDate)

        # Convert coordinates to a Polygon geometry
        if coordinates:
            if coordinates[0] != coordinates[-1]:
                coordinates.append(coordinates[0])
            polygon_coordinates = coordinates
            print("Polygon coordinates: ", polygon_coordinates)
            geometry = Geometry(geometry={'type': 'Polygon', 'coordinates': [polygon_coordinates]}, crs=CRS.WGS84)
        else:
            geometry = None

        # Initialize the SentinelHub request
        request = SentinelHubStatistical(
            aggregation=SentinelHubStatistical.aggregation(
                evalscript=evalscript,
                time_interval=timeInterval,
                aggregation_interval='P1M',
                size=[537.101, 589.55],
            ),
            input_data=[
                SentinelHubStatistical.input_data(DataCollection.SENTINEL2_L2A),
            ],
            geometry=geometry,
            config=config
        )

        # Fetch the data
        response = request.get_data()
        
        # Generate the graph
        plot_path = generate_ndvi_graph(response)
        
        # Process the response
        processed_response = process_response(response)
        
        # Add the graph URL to the response
        processed_response['graph_url'] = f'/{plot_path}'
        save_report_to_file(processed_response)
        return jsonify(processed_response), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

# Add a new route to serve static files
@app.route('/static/<path:filename>')
def serve_static(filename):
    try:
        return send_file(
            os.path.join('static', secure_filename(filename)),
            mimetype='image/png'
        )
    except Exception as e:
        return jsonify({'error': str(e)}), 404

@app.route('/intermed')
def intermed():
    return render_template('intermed.html')

# Function to classify NDVI score
def classify_ndvi_score(ndvi_mean):
    if ndvi_mean > 0.7:
        return "very good vegetation"
    elif ndvi_mean >= 0.5:
        return "good vegetation"
    elif ndvi_mean >= 0.3:
        return "medium vegetation"
    else:
        return "low to average vegetation"

# Function to classify BSI score
def classify_bsi_score(bsi_mean):
    if bsi_mean > 0:
        return "bare soil"
    else:
        return "vegetated soil"
# a function that will give me vegetation index of the land latest, 
# Function to detect recent vegetation cycles
def detect_recent_vegetation_cycle(ndvi_analysis, max_allowed_other_vegetations=5):
    recent_cycle = []
    other_vegetation_count = 0

    for entry in ndvi_analysis:
        if entry['ndvi_score'] == 'low to average vegetation':
            if recent_cycle and other_vegetation_count <= max_allowed_other_vegetations:
                recent_cycle.append(entry)
                other_vegetation_count = 0  # Reset the count after finding the cycle end
            else:
                recent_cycle = [entry]
                other_vegetation_count = 0
        else:
            if recent_cycle:
                other_vegetation_count += 1
                if other_vegetation_count > max_allowed_other_vegetations:
                    recent_cycle = []  # Reset the cycle if max allowed other vegetations exceeded
            else:
                other_vegetation_count = 0
    return bool(recent_cycle)

def process_response(response):
    
  # Initialize lists to store analysis results
  ndvi_analysis = []
  bsi_analysis = []

  # Extract NDVI and BSI data and perform analysis
#   print(response)
#   print(response[0]['data'],type(response[0]['data']))
  intervals = response[0]['data']
  previous_ndvi_mean = None
  previous_bsi_mean = None

  for interval in intervals:
      ndvi_stats = interval['outputs']['ndvi']['bands']['NDVI']['stats']
      bsi_stats = interval['outputs']['bsi']['bands']['BSI']['stats']

      ndvi_mean = ndvi_stats['mean']
      bsi_mean = bsi_stats['mean']

      # NDVI analysis
      ndvi_score = classify_ndvi_score(ndvi_mean)
      if previous_ndvi_mean is not None:
          ndvi_trend = "Increased" if ndvi_mean > previous_ndvi_mean else "Decreased"
      else:
          ndvi_trend = "N/A"
      ndvi_analysis.append({
          "interval": interval['interval']['from'],
          "mean_ndvi": ndvi_mean,
          "ndvi_score": ndvi_score,
          "ndvi_trend": ndvi_trend
      })
      print(ndvi_analysis)
      print(type(ndvi_analysis))

      # BSI analysis
      bsi_score = classify_bsi_score(bsi_mean)
      if previous_bsi_mean is not None:
          bsi_trend = "Increased" if bsi_mean > previous_bsi_mean else "Decreased"
      else:
          bsi_trend = "N/A"
      bsi_analysis.append({
          "interval": interval['interval']['from'],
          "mean_bsi": bsi_mean,
          "bsi_score": bsi_score,
          "bsi_trend": bsi_trend
      })

      previous_ndvi_mean = ndvi_mean
      previous_bsi_mean = bsi_mean


  # Storing analysis in the Csv files 
  ndvi_df = pd.DataFrame(ndvi_analysis)
  bsi_df = pd.DataFrame(bsi_analysis)

  ndvi_csv_path = "ndvi_analysis.csv"
  bsi_csv_path = "bsi_analysis.csv"

  ndvi_df.to_csv(ndvi_csv_path, index=False)
  bsi_df.to_csv(bsi_csv_path, index=False)
  # Store the analysis results in a dictionary
  output_dict = {
      "ndvi_analysis": ndvi_analysis,
      "bsi_analysis": bsi_analysis
  }
  recent_veg  = detect_recent_vegetation_cycle(ndvi_analysis,4)
#   latest
  analysis_report = [recent_veg, ndvi_analysis[-1]]
    # Example processing - adjust according to your needs
  return {"vegetationData": response, "processedData": output_dict,  "analysisReport": analysis_report}  # Simplified example

@app.route('/get_712', methods=['POST'])
@cross_origin()
def get_712():
    # Extract data from the request
    data = req.get_json()

    # Extract details from the request data
    coordinates = data.get('coordinates')
    survey_number = data.get('survey_number')
    owner_details = data.get('owner_details')

    # Print the extracted data for debugging purposes
    print("Coordinates:", coordinates)
    print("Survey Number:", survey_number)
    print("Owner Details:", owner_details)

    # Prepare the response
    response = {
        'coordinates': coordinates,
        'survey_number': survey_number, 
        'owner_details': owner_details,
        'area_of_land': 2.45,
        'type_of_cultivation': 'bagayat',
        'water_source': 'well',
        'tax_information': 'bharla',
        'block_number': 'B-145'
    }

    # Check for missing fields and handle appropriately
    missing_fields = [key for key, value in response.items() if value is None]
    if missing_fields:
        return jsonify({
            'status': 'failure',
            'message': f'Missing or invalid fields: {", ".join(missing_fields)}',
            'data': response
        }), 400

    return jsonify({
        'status': 'success',
        'data': response
    })

# Path to your image file
ndvi_image_path = r".C:\Users\Apoorva\Documents\VIT\Major Project\Bhoomi\Bhoomi-main\server\vegetation\static\ndvi_plot.png"

@app.route('/ndvi-image')
def get_ndvi_image():
    try:
        return send_file(ndvi_image_path, mimetype='image/png')
    except Exception as e:
        print(f"Error fetching image: {e}")  # Log the error for debugging
        return jsonify({'error': 'Image not found'}), 404



@app.route('/output.')
def serve_output_json():
    try:
        return send_file("output.json", mimetype="application/json")
    except Exception as e:
        return jsonify({"error": str(e)}), 404
    
@app.route('/analysis-report', methods=['GET'])
def get_analysis_report():
    try:
        # Your existing logic
        with open("output.json", "r") as file:
            data = json.load(file)
        analysis_report = data.get("analysisReport", {})
        return jsonify({"analysisReport": analysis_report}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/admin/view-application/<aadhar_number>', methods=['GET'])
@cross_origin()
def view_application(aadhar_number):
    try:
        if os.path.exists(LOAN_APPLICATION_FILE):
            with open(LOAN_APPLICATION_FILE, 'r') as file:
                loan_data = json.load(file)
        else:
            return jsonify({"message": "Loan application file not found."}), 404

        application = next((entry for entry in loan_data if entry.get('aadharNumber') == aadhar_number), None)
        if application:
            return jsonify({"data": application}), 200
        else:
            return jsonify({"message": "Application not found."}), 404
    except Exception as e:
        return jsonify({"message": str(e)}), 500



if __name__ == '__main__':
    app.run(port=5000, debug=True)