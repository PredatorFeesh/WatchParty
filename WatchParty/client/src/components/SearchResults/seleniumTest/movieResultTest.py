from selenium import webdriver
import unittest
import time

class ResolutionTest(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.driver = webdriver.Chrome(executable_path='/Users/Shahan/Desktop/chromedriver')
        cls.driver.implicitly_wait(10)
        cls.driver.set_window_size(320, 480)

    #This test is to check whether the nav bar works on 500px and below
    def test_sandwich_bar(self):
        self.driver.get("http://localhost:3000/")
        self.driver.find_element_by_xpath('//span[@class = "navbar-toggler-icon"]').click()


    #This test is to check whether the user can type something in the search bar
    def test_search_bar(self):
        self.driver.get("http://localhost:3000/")
        self.driver.find_element_by_xpath('//span[@class = "navbar-toggler-icon"]').click()
        self.driver.find_element_by_xpath('//input[@placeholder = "Search movies or users"]').send_keys("Batman")
        time.sleep(1)


    #This test is to make sure a user can search for a movie on a 500px or below width resolution
    def test_search(self):
        self.driver.get("http://localhost:3000/")
        self.driver.find_element_by_xpath('//span[@class = "navbar-toggler-icon"]').click()
        self.driver.find_element_by_xpath('//input[@placeholder = "Search movies or users"]').send_keys("Batman")
        self.driver.implicitly_wait(10)
        self.driver.find_element_by_xpath('//button[@class = "btn btn-outline-info"]').click()


    #This test is to make sure a user click on a movie title and learn more
    def test_movie_link(self):
        self.driver.get("http://localhost:3000/")
        self.driver.find_element_by_xpath('//span[@class = "navbar-toggler-icon"]').click()
        self.driver.find_element_by_xpath('//input[@placeholder = "Search movies or users"]').send_keys("Batman")
        self.driver.find_element_by_xpath('//button[@class = "btn btn-outline-info"]').click()
        self.driver.find_element_by_xpath('//div[@class = "movie-title"]').click()
        time.sleep(1)

    @classmethod
    def tearDownClass(cls):
        cls.driver.close()
        cls.driver.quit()
        print("Test Completed")


if __name__ == '__main__':
    ResolutionTest()