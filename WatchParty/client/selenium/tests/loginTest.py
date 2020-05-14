from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
import unittest
import time

class loginPage(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        options = webdriver.ChromeOptions()
        options.add_argument('--headless')
        cls.driver = webdriver.Chrome(ChromeDriverManager().install(), options=options)
        cls.driver.implicitly_wait(10)
        cls.driver.set_window_size(320, 480)

    #This test is to make sure a user can sign up
    def test_signup(self):
        self.driver.get("https://watch-party-test-web-client.herokuapp.com/")
        self.driver.find_element_by_xpath('//a[@href = "/register"]').click()
        self.driver.implicitly_wait(10) 
        url = self.driver.current_url
        self.assertEqual(url, "https://watch-party-test-web-client.herokuapp.com/register")        
        self.driver.find_element_by_xpath('//input[@name = "registerFirst"]').send_keys("test")
        self.driver.find_element_by_xpath('//input[@name = "registerLast"]').send_keys("test")
        self.driver.find_element_by_xpath('//input[@name = "registerEmail"]').send_keys("test@test.com")
        self.driver.find_element_by_xpath('//input[@name = "registerPassword"]').send_keys("test")
        self.driver.find_element_by_xpath('//input[@name = "registerPasswordConfirm"]').send_keys("test")
        self.driver.find_element_by_xpath('//button[@class = "btn btn-primary"]').click()
        ale = self.driver.switch_to_alert()
        ale.accept()
        self.driver.implicitly_wait(10) 
        urlS = self.driver.current_url
        self.assertEqual(urlS, "https://watch-party-test-web-client.herokuapp.com/" )
        time.sleep(5)
    
    #This test is to make sure a user can login given the test credentials 
    def test_login(self):
        self.driver.get("https://watch-party-test-web-client.herokuapp.com/")        
        self.driver.find_element_by_xpath('//input[@placeholder = "Enter email"]').send_keys("test@test.com")
        self.driver.find_element_by_xpath('//input[@name = "loginPassword"]').send_keys("test")
        self.driver.find_element_by_xpath('//button[@class = "btn btn-primary"]').click()
        self.driver.implicitly_wait(10) 
        urlS = self.driver.current_url
        self.assertEqual(urlS, "https://watch-party-test-web-client.herokuapp.com/" )
        time.sleep(5)

    #This test is to make sure the user can sign out
    def test_logout(self):
        self.driver.get("https://watch-party-test-web-client.herokuapp.com/")        
        self.driver.find_element_by_xpath('//input[@placeholder = "Enter email"]').send_keys("test@test.com")
        self.driver.find_element_by_xpath('//input[@name = "loginPassword"]').send_keys("test")
        self.driver.find_element_by_xpath('//button[@class = "btn btn-primary"]').click()
        self.driver.implicitly_wait(10) 
        urlS = self.driver.current_url
        self.assertEqual(urlS, "https://watch-party-test-web-client.herokuapp.com/" )
        time.sleep(5)
        self.driver.find_element_by_xpath('//span[@class = "navbar-toggler-icon"]').click()
        self.driver.find_element_by_xpath('//a[@class = "dropdown-toggle nav-link"]').click()
        self.driver.find_element_by_xpath('//a[@href = "/logout"]').click()
        self.driver.find_element_by_xpath('//button[@class = "btn btn-danger"]').click()




    @classmethod
    def tearDownClass(cls):
        cls.driver.close()
        cls.driver.quit()
        print("Test Completed")


if __name__ == '__main__':
    loginPage()