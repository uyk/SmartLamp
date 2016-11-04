#-*-encoding:utf-8
'''
기상청RSS에서 xml파일을 받아와 파싱
날씨가 맑으면 23번 핀을 켜고 비 또는 눈이 오면 24번 핀을 켠다
'''

from bs4 import BeautifulSoup
import urllib.request as MyURL
import RPi.GPIO as GPIO
import time

######################GPIO SETTING######################
GPIO.setmode(GPIO.BCM)
GPIO.setup(23, GPIO.OUT)
GPIO.output(23, False)
GPIO.setup(24, GPIO.OUT)
GPIO.output(24, False)
#######################################################

#####################PARSIGN SETTING#####################
japi = 'http://www.kma.go.kr/wid/queryDFSRSS.jsp?zone=4413136000' #병천  
date = {'0':"오늘", '1' : '내일', '2' : '모레'}
sky = {'1':'맑음', '2' : '구름 조금', '3' :  '구름 많음', '4' : '흐림'}
pty = { '0' : '없음', '1' : '비',  '2' : '비/눈', '3' : '눈/비'} 
#######################################################


#현재 날씨에 대한 정보를 2초 단위로 받아와 현재 기상 정보를 바탕으로 LED 제어

try :
    while True :
        response = MyURL.urlopen(japi);                             #Open URL
        weather = BeautifulSoup(response, 'html.parser')     #Make new Parser
        
        data = weather.findAll('data')[0]       #첫번째 data인 현재 날씨에 대한 부분을 data에 저장 
        print("시간 : ", data.hour.string)
        print(date[data.day.string])              #날짜
        print(pty[data.pty.string])                 #강수상태
        print("날씨 :", data.wfkor.string)
        print("")
            
        if data.pty.string == 0 :
            GPIO.output(23, True)
        else :
            GPIO.output(24, True)
        time.sleep(2)
            
except KeyboardInterrupt :
    GPIO.cleanup()

'''
#발표된 모든 시간에 대한 반복

response = MyURL.urlopen(japi);                             #Open URL
weather = BeautifulSoup(response, 'html.parser')     #Make new Parser

pubdate = weather.findAll('pubdate')[0]
category = weather.findAll('category')[0]
tm = weather.findAll('tm')[0]

pubdate = weather.findAll('pubdate')[0]
category = weather.findAll('category')[0]
tm = weather.findAll('tm')[0]

print("현재 시간 : ", pubdate.string)
print("장소 : ", category.string)
print("발표시각  : ", tm.string)
print("")


try :
    for data in weather.findAll('data'):
        print("시간 : ", data.hour.string)
        print(date[data.day.string])   #날짜
        print(pty[data.pty.string])      #강수상태
        print("날씨 :", data.wfkor.string)
        print("")
        
        if data.pty.string == 0 :
            GPIO.output(23, True)
        else :
            GPIO.output(24, True)
        time.sleep(3)
    GPIO.cleanup()
except KeyboardInterrupt :
    GPIO.cleanup()
'''
