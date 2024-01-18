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
print("    Username: admin")
print("    password: admin")
print("    role: transport_admin")
driver = webdriver.Firefox()
driver.get("http://localhost:5173")

button = driver.find_element(By.CLASS_NAME, "btn")
username_input = driver.find_element(By.ID, "username")
password_input = driver.find_element(By.ID, "password")
roles_input = driver.find_element(By.ID, "transport_admin")

username_input.send_keys("admin2")
password_input.send_keys("admin")
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

#driver.close()

