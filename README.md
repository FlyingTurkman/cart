# Task Hakkında
Merhaba öncelikli olarak bu taski geliştirme fırsatına eriştiğim için mutluyum.
Daha önce next-js ile multi-zone kullanmamıştım bu projede öğrenerek kendimi geliştirme fırsatı buldum.
App-router yapısı ile module-federation yapısı arasında uyum problemi olduğu için multi-zone yöntemini tercih ettim.
Cart uygulaması [Home](https://github.com/FlyingTurkman/home) uygulamasıyla birlikte çalışmaktadır bu yüzden aynı anda çalıştırınız.

## Task için öz-eleştiri
İki projenin birlikte çalışarak sepete aynı ürünlerin eklenebilmesi için cookie kullandım. Cookie tercih etmemin sebebi ise task içerisinde bir veritabanı kullanıp kullanamayacağımın belirtilmemiş olmasıdır. Proje için en doğru yöntem sepet bilgilerinin cookie üzerinde saklanması değil bir veritabanı aracılığıyla saklanmasıdır. Eğer veritabanı kullanmış olsaydım api haberleşmelerinin header kısımlarına token göndererek kullanıcıların sepetlerine ekleme yapabilmesini sağlardım.