from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By

class LocalStorage:

    def __init__(self, driver) :
        self.driver = driver

    def __len__(self):
        return self.driver.execute_script("return window.localStorage.length;")

    def items(self) :
        return self.driver.execute_script( \
            "var ls = window.localStorage, items = {}; " \
            "for (var i = 0, k; i < ls.length; ++i) " \
            "  items[k = ls.key(i)] = ls.getItem(k); " \
            "return items; ")

    def keys(self) :
        return self.driver.execute_script( \
            "var ls = window.localStorage, keys = []; " \
            "for (var i = 0; i < ls.length; ++i) " \
            "  keys[i] = ls.key(i); " \
            "return keys; ")

    def get(self, key):
        return self.driver.execute_script("return window.localStorage.getItem(arguments[0]);", key)

    def set(self, key, value):
        self.driver.execute_script("window.localStorage.setItem(arguments[0], arguments[1]);", key, value)

    def has(self, key):
        return key in self.keys()

    def remove(self, key):
        self.driver.execute_script("window.localStorage.removeItem(arguments[0]);", key)

    def clear(self):
        self.driver.execute_script("window.localStorage.clear();")

    def __getitem__(self, key) :
        value = self.get(key)
        if value is None :
          raise KeyError(key)
        return value

    def __setitem__(self, key, value):
        self.set(key, value)

    def __contains__(self, key):
        return key in self.keys()

    def __iter__(self):
        return self.items().__iter__()

    def __repr__(self):
        return self.items().__str__()

print("[INFO] Testing successful login: ")
print("    Username: stela")
print("    password: pass")
print("    role: transport_admin")
driver = webdriver.Firefox()
driver.get("http://localhost:5173")

button = driver.find_element(By.CLASS_NAME, "btn")
username_input = driver.find_element(By.ID, "username")
password_input = driver.find_element(By.ID, "password")
roles_input = driver.find_element(By.ID, "transport_admin")

username_input.send_keys("stela")
password_input.send_keys("pass")
roles_input.click()
button.click()

print("    [TEST] Checking successful navigation")
url = driver.current_url
if (not url.endswith("/transport")):
    print("[-] Failed check")
    exit(1)

print("    [TEST] Check local storage for a token")
storage = LocalStorage(driver)
if (storage.get("token") is None):
    print("[-] Failed check")
    exit(1)
print("[+] Success")
print("-" * 20)

# -----------------------------------------------
print("[INFO] Testing adding a transporter")

add_button = driver.find_element(By.CLASS_NAME, "addBtn")
add_button.click()
print("    [TEST] Checking if a menu popped up")
try:
    add_form = driver.find_element(By.CLASS_NAME, "add-form")
except (e):
    print("[-] Failed")
    exit(1)

print("    [INFO] Filling up form with values")
print("        Email: transporter@transp.com")
print("        Radno od: 8:00:00")
print("        Radno do: 15:00:00")
print("        Vrsta: auto")
print("        Kapacitet: 4")
print("        Model: Opel Astra")
email_input = driver.find_element(By.ID, "1")
radno_od_input = driver.find_element(By.ID, "2")
radno_do_input = driver.find_element(By.ID, "3")
type_input = driver.find_element(By.ID, "4")
capacity_input = driver.find_element(By.ID, "5")
model_input = driver.find_element(By.ID, "6")

email_input.send_keys("transporter@transp.com")
radno_od_input.send_keys("08:00:00")
radno_do_input.send_keys("15:00:00")
type_input.send_keys("auto")
capacity_input.send_keys("4")
model_input.send_keys("Opel Astra")

submit_button = driver.find_element(By.CLASS_NAME, "btn")
submit_button.click()

print("    [TEST] Checking if the transported was added to the page")
email = driver.find_element(By.CSS_SELECTOR, "ul.lista>li:last-of-type>div:first-child>div:first-child")
if (not "transporter@transp.com" in email.text):
    print("[-] Failed")
    exit(1)

print("[+] Success")
print("-" * 20)

# -----------------------------------------------
print("[INFO] Testing adding a housing")

driver.get("http://localhost:5173/")
button = driver.find_element(By.CLASS_NAME, "btn")
username_input = driver.find_element(By.ID, "username")
password_input = driver.find_element(By.ID, "password")
roles_input = driver.find_element(By.ID, "sleep_admin")

username_input.send_keys("stela")
password_input.send_keys("pass")
roles_input.click()
button.click()

add_button = driver.find_element(By.CLASS_NAME, "addBtn")
add_button.click()
print("    [TEST] Checking if a menu popped up")
try:
    add_form = driver.find_element(By.CLASS_NAME, "add-form")
except (e):
    print("[-] Failed")
    exit(1)

print("    [INFO] Filling up form with values")
print("        Adresa: 221B Baker Street")
print("        Tip: stan")
print("        Kategorija: 1")
print("        Dostupnost: Dostupno")
address_input = driver.find_element(By.ID, "1")
type_input2 = driver.find_element(By.ID, "2")
category_input = driver.find_element(By.ID, "3")
available_input = driver.find_element(By.ID, "4")

address_input.send_keys("221B Baker Street")
type_input2.send_keys("stan")
category_input.send_keys("1")
available_input.click()

submit_button = driver.find_element(By.CLASS_NAME, "btn")
submit_button.click()

print("    [TEST] Checking if the housing was added to the page")
address = driver.find_element(By.CSS_SELECTOR, "ul.lista>li:last-of-type>div:first-child>div:first-child")
if (not "221B Baker Street" in address.text):
    print("[-] Failed")
    exit(1)

print("[+] Success")
print("-" * 20)

# -----------------------------------------------
print("[INFO] Testing adding a user")

driver.get("http://localhost:5173/")
button = driver.find_element(By.CLASS_NAME, "btn")
username_input = driver.find_element(By.ID, "username")
password_input = driver.find_element(By.ID, "password")
roles_input = driver.find_element(By.ID, "user_admin")

username_input.send_keys("stela")
password_input.send_keys("pass")
roles_input.click()
button.click()

add_button = driver.find_element(By.CLASS_NAME, "addBtn")
add_button.click()
print("    [TEST] Checking if a menu popped up")
try:
    add_form = driver.find_element(By.CLASS_NAME, "add-form")
except (e):
    print("[-] Failed")
    exit(1)

print("    [INFO] Filling up form with values")
print("        Ime: Sherlock")
print("        Prezime: Holmes")
print("        Preference: tip:stan")
print("        Email: scienceofdeduction@gmail.com")
print("        Datum dolaska: 2024-1-11")
print("        Datum odlaska: 2024-1-12")

name_input = driver.find_element(By.ID, "1")
lastname_input = driver.find_element(By.ID, "2")
preference_input = driver.find_element(By.ID, "3")
email_input2 = driver.find_element(By.ID, "4")
data_arrive_input = driver.find_element(By.ID, "5")
data_leave_input = driver.find_element(By.ID, "6")


name_input.send_keys("Sherlock")
lastname_input.send_keys("Holmes")
preference_input.send_keys("tip:stan")
email_input2.send_keys("scienceofdeduction@gmail.com")
data_arrive_input.send_keys("01112024")
data_leave_input.send_keys("01122024")


submit_button = driver.find_element(By.CLASS_NAME, "btn")
submit_button.click()

print("    [TEST] Checking if the housing was added to the page")
name = driver.find_element(By.CSS_SELECTOR, "ul.lista>li:last-of-type>div:first-child>div:first-child")
if (not "Sherlock" in name.text):
    print("[-] Failed")
    exit(1)

print("[+] Success")
print("-" * 20)

# -----------------------------------------------
print("[INFO] Testing adding a new admin")

driver.get("http://localhost:5173/")
button = driver.find_element(By.CLASS_NAME, "btn")
username_input = driver.find_element(By.ID, "username")
password_input = driver.find_element(By.ID, "password")
roles_input = driver.find_element(By.ID, "sleep_admin")

username_input.send_keys("stela")
password_input.send_keys("pass")
roles_input.click()
button.click()

add_button = driver.find_element(By.CLASS_NAME, "admin")
add_button.click()
print("    [TEST] Checking if a menu popped up")
try:
    add_form = driver.find_element(By.CLASS_NAME, "add-form")
except (e):
    print("[-] Failed")
    exit(1)

print("    [INFO] Filling up form with values")
print("        Ime: Sherlock")
print("        Prezime: Holmes")
print("        Roles: sleep_admin, user_admin")

name_input = driver.find_element(By.ID, "1")
lastname_input = driver.find_element(By.ID, "2")
role1_input = driver.find_element(By.ID, "3")
role2_input = driver.find_element(By.ID, "4")


name_input.send_keys("Sherlock")
lastname_input.send_keys("Holmes")
role1_input.click()
role2_input.click()

submit_button = driver.find_element(By.CLASS_NAME, "btn")
submit_button.click()

print("    [TEST] Checking if logging out works")
logout = driver.find_element(By.CLASS_NAME, "odjava")
logout.click()
if (driver.current_url.endswith("/housing")):
    print("[-] Failed")
    exit(1)

print("    [INFO] Logging in as new user to the housing section")
button = driver.find_element(By.CLASS_NAME, "btn")
username_input = driver.find_element(By.ID, "username")
password_input = driver.find_element(By.ID, "password")
roles_input = driver.find_element(By.ID, "sleep_admin")

username_input.send_keys("Sherlock")
password_input.send_keys("Holmes")
roles_input.click()
button.click()

print("    [TEST] Checking if redirect was correct")
if (not driver.current_url.endswith("/housing")):
    print("[-] Failed")
    exit(1)

print("    [TEST] Checking if the displayed username is correct")
if (driver.find_element(By.CSS_SELECTOR, "span.username").text != "Sherlock"):
    print("[-] Failed")
    exit(1)

print("[+] Success")
print("-" * 20)

driver.close()

