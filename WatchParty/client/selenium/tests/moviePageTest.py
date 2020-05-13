from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
import unittest
import time

class moviePage(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        options = webdriver.ChromeOptions()
        options.add_argument('--headless')
        cls.driver = webdriver.Chrome(ChromeDriverManager().install(), options=options)
        cls.driver.implicitly_wait(10)
        cls.driver.set_window_size(320, 480)

    #This test is to make sure a user click Read More Button and sends you to the right location for Batman
    def test_movie_read(self):
        self.driver.get("https://watch-party-test-web-client.herokuapp.com/")
        self.driver.find_element_by_xpath('//span[@class = "navbar-toggler-icon"]').click()
        self.driver.find_element_by_xpath('//input[@data-testid = "search-field"]').send_keys("Batman")
        self.driver.find_element_by_xpath('//button[@class = "btn btn-outline-info"]').click()
        self.driver.find_element_by_xpath('//div[@class = "movie-title"]').click()
        self.driver.find_element_by_xpath('//a[@class = "read-more-btn btn btn-secondary"]').click()
        self.driver.implicitly_wait(10) 
        self.assertEqual(len(self.driver.window_handles), 2)
        self.driver.switch_to.window(self.driver.window_handles[1]) # switch to new ta        
        url = self.driver.current_url
        self.assertEqual(url, "https://www.imdb.com/title/tt0372784/" )
        time.sleep(5)

    #This test is to make sure a users click trailer Button and sends you to the right location for Batman
    def test_movie_trailer(self):
        self.driver.get("https://watch-party-test-web-client.herokuapp.com/")
        self.driver.implicitly_wait(5) 
        self.driver.find_element_by_xpath('//input[@data-testid = "search-field"]').send_keys("Batman")
        self.driver.find_element_by_xpath('//button[@class = "btn btn-outline-info"]').click()
        self.driver.find_element_by_xpath('//div[@class = "movie-title"]').click()
        self.driver.find_element_by_xpath('//a[@class = "trailer-btn btn btn-secondary"]').click()
        self.driver.implicitly_wait(10) 
        self.assertEqual(len(self.driver.window_handles), 3)
        self.driver.switch_to.window(self.driver.window_handles[2]) # switch to new ta        
        url = self.driver.current_url
        self.assertEqual(url, "https://www.youtube.com/watch?v=neY2xVmOfUM" )
        time.sleep(5)

    #This test is to make sure a user can click on mark 
    def test_movie_mark(self):
        self.driver.get("https://watch-party-test-web-client.herokuapp.com/")
        self.driver.implicitly_wait(10) 
        self.driver.find_element_by_xpath('//span[@class = "navbar-toggler-icon"]').click()
        self.driver.find_element_by_xpath('//input[@data-testid = "search-field"]').send_keys("Batman")
        self.driver.find_element_by_xpath('//button[@class = "btn btn-outline-info"]').click()
        self.driver.find_element_by_xpath('//div[@class = "movie-title"]').click()
        self.driver.find_element_by_xpath('//button[@class = "to-watch-btn btn btn-success"]').click()
        

    @classmethod
    def tearDownClass(cls):
        cls.driver.close()
        cls.driver.quit()
        print("Test Completed")


if __name__ == '__main__':
    moviePage()