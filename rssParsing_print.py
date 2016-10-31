#-*-encoding:utf-8
#기상청에서 xml파일을 받아와 파싱하여 출력

from bs4 import BeautifulSoup
import urllib.request as MyURL

japi = 'http://www.kma.go.kr/wid/queryDFSRSS.jsp?zone=4413136000' #병천  
date = {'0':"오늘", '1' : '내일', '2' : '모레'}
sky = {'1':'맑음', '2' : '구름 조금', '3' :  '구름 많음', '4' : '흐림'}
pty = { '0' : '없음', '1' : '비',  '2' : '비/눈', '3' : '눈/비'} 


response = MyURL.urlopen(japi);
weather = BeautifulSoup(response, 'html.parser')

pubdate = weather.findAll('pubdate')[0]
category = weather.findAll('category')[0]
tm = weather.findAll('tm')[0]

print("현재 시간 : ", pubdate.string)
print("장소 : ", category.string)
print("발표시각  : ", tm.string)
print("")

for data in weather.findAll('data'):
    print("시간 :", data.hour.string)
    print(date[data.day.string])  #날짜
    print("기온 :",data.temp.string)
    print("최고온도 :", data.tmx.string)
    print("최저온도 :", data.tmn.string)
    print(sky[data.sky.string])     #하늘상태
    print(pty[data.pty.string])      #강수상태
    print("날씨 :", data.wfkor.string)
    print("강수확률(%) :", data.pop.string)
    print("풍속(m/s) :", data.ws.string)
    print("습도(%) :", data.reh.string)
    print("") 
        
