'''
Created on Sep 21, 2016

@author: murthy
'''
import os, MySQLdb, json, MySQLdb.cursors
from flask import Flask, request

def getQueryResults(query):
    conn = MySQLdb.connect(host = "localhost", port = 3306, user = "dashboards", passwd = "dashboards", db = "dashboards", cursorclass = MySQLdb.cursors.DictCursor)
    cur = conn.cursor()
    cur.execute(query)
    rows = cur.fetchall()
    conn.close()
    return rows

app = Flask(__name__, static_folder="build", static_url_path='')

@app.route('/dashboards')
def root():
    return app.send_static_file('index.html')

@app.route('/getAppSetting', methods=['GET','POST'])
def app_settings():
    result = {}
    #Get App Settngs
    query = """
        SELECT `key`,`value` FROM tbl_app_settings
    """
    settings = {}
    rows = getQueryResults(query)
    for row in rows:
        settings[row['key']] = row['value']
    result['settings'] = settings

    #Get All Clients
    query = """
        SELECT DISTINCT `client` `name` FROM tbl_rev_summary;
    """
    rows = getQueryResults(query)
    result['clients'] = rows

    #Get All Years
    query = """
        SELECT DISTINCT `year` FROM tbl_rev_summary;
    """
    rows = getQueryResults(query)
    result['years'] = rows

    return json.dumps(result)

@app.route('/getRevSummary', methods=['GET','POST'])
def rev_summary():
    query = """
        SELECT
            a.category `Name`,
            AVG(b.actual) `FYPrevious`,
            TRUNCATE(SUM(CASE WHEN `qrtr` = 1 THEN a.actual ELSE NULL END),3) `Q1`,
            TRUNCATE(SUM(CASE WHEN `qrtr` = 2 THEN a.actual ELSE NULL END),3) `Q2`,
            TRUNCATE(SUM(CASE WHEN `qrtr` = 3 THEN a.actual ELSE NULL END),3) `Q3`,
            TRUNCATE(SUM(CASE WHEN `qrtr` = 4 THEN a.actual ELSE NULL END),3) `Q4`,
            TRUNCATE(AVG(a.actual),3) `FYCurrent`,
            TRUNCATE(AVG(a.target),3) `Target`
        FROM
            tbl_rev_summary a LEFT JOIN 
            (SELECT category, `client`, `year`, SUM(actual) actual FROM tbl_rev_summary GROUP BY `client`, `year`, category) b ON 
            a.category = b.category AND a.`client` = b.`client` AND a.`year` = b.`year` - 1
        WHERE
            a.`client` = '%s' AND
            a.`year` = '%s'
        GROUP BY
            a.`category`
    """
    query = query%(request.values.get('client'),request.values.get('year'))
    rows = getQueryResults(query)
    return json.dumps(rows)

@app.route('/getRevCurrentQuarter', methods=['GET','POST'])
def rev_current_qrtr():
    query = """
        SELECT 
            category `Name`, 
            truncate(avg(forecast),3) `Forecast`, 
            truncate(avg(target),3) `Target`,
            truncate(avg(forecast)/avg(target),3) `Target Acheievment`
        FROM 
            tbl_rev_summary 
        WHERE 
            `client` = '%s' and 
            `year` = '%s' and 
            `qrtr` = '%s' 
        GROUP BY 
            category
    """
    query = query%(request.values.get('client'),request.values.get('year'),request.values.get('qrtr'))
    rows = getQueryResults(query)
    return json.dumps(rows)

@app.route('/getAttritionData', methods=['GET','POST'])
def attrition_data():
    query = """
        SELECT
            category `name`,
            TRUNCATE(sum(actual),2) `y`
        FROM 
            tbl_tower_summary 
        WHERE 
            `client` = '%s' AND
            `year` = '%s' AND
            `qrtr` = '%s' AND
            report = 'Attrition'
        GROUP BY
            category
    """
    query = query%(request.values.get('client'),request.values.get('year'),request.values.get('qrtr'))
    rows = getQueryResults(query)
    return json.dumps(rows)

@app.route('/getResourceData', methods=['GET','POST'])
def resource_data():
    query = """
        SELECT
            category `name`,
            TRUNCATE(sum(actual),2) `pie`
        FROM 
            tbl_tower_summary 
        WHERE 
            `client` = '%s' AND
            `year` = '%s' AND
            `qrtr` = '%s' AND
            report = ''
        GROUP BY
            category
    """
    query = query%(request.values.get('client'),request.values.get('year'),request.values.get('qrtr'))
    rows = getQueryResults(query)
    return json.dumps(rows)

@app.route('/getCSATData', methods=['GET','POST'])
def csat_data():
    query = """
        SELECT
            category `name`,
            TRUNCATE(sum(actual),2) `y`
        FROM 
            tbl_tower_summary 
        WHERE 
            `client` = '%s' AND
            `year` = '%s' AND
            `qrtr` = '%s' AND
            report = 'CSAT'
        GROUP BY
            category
    """
    query = query%(request.values.get('client'),request.values.get('year'),request.values.get('qrtr'))
    rows = getQueryResults(query)
    return json.dumps(rows)

@app.route('/getTowerView', methods=['GET','POST'])
def tower_view():
    query = """
        SELECT
            category `name`,
            TRUNCATE(sum(actual),2) `achieved`,
            TRUNCATE(sum(target),2) `expected`
        FROM 
            tbl_tower_summary 
        WHERE 
            `client` = '%s' AND
            `year` = '%s' AND
            `qrtr` = '%s' AND
            report = 'Tower View'
        GROUP BY
            category
    """
    query = query%(request.values.get('client'),request.values.get('year'),request.values.get('qrtr'))
    rows = getQueryResults(query)
    return json.dumps(rows)

@app.route('/getTowerQuarter', methods=['GET','POST'])
def tower_quarter():
    query = """
        SELECT
            category,
            TRUNCATE(sum(forecast),2) `gmfc`,
            TRUNCATE(sum(target),2) `gmtarget`
        FROM 
            tbl_tower_summary 
        WHERE 
            `client` = '%s' AND
            `year` = '%s' AND
            `qrtr` = '%s' AND
            report = 'Quarter Tower'
        GROUP BY
            category
    """
    query = query%(request.values.get('client'),request.values.get('year'),request.values.get('qrtr'))
    rows = getQueryResults(query)
    return json.dumps(rows)

@app.route('/getREDData', methods=['GET','POST'])
def red_data():
    query = """
        SELECT
            category `name`,
            TRUNCATE(sum(actual),2) `y`
        FROM 
            tbl_tower_summary 
        WHERE 
            `client` = '%s' AND
            `year` = '%s' AND
            `qrtr` = '%s' AND
            report = 'Red Project'
        GROUP BY
            category
    """
    query = query%(request.values.get('client'),request.values.get('year'),request.values.get('qrtr'))
    rows = getQueryResults(query)
    return json.dumps(rows)

if __name__ == '__main__':
    app.run(port = 5555, debug = True)
