var urlArray = [
    "https://example.com/index.html?param1=value1&param2=value2#anchor1", 
    "https://example.com/index.html?param1=value1&param2=value2&param3=true#anchor2", 
    "https://example.com/index.html?param1=value1&param2=value2&param3=false#anchor3", 
    "https://example.com/index.html?param1=value1&param2=value2&param4#anchor4", 
    "https://example.com/index.html?param1=value1&param2=value2&param5=%25#anchor5", 
    "https://example.com/index.html?param1=value1&param2=value2&param6=undefined#anchor6", 
    "https://example.com/index.html?param1=value1&param2=value2&param7=null#anchor7"
];

function testURL(index) {
    console.info(`%cURL: ${urlArray[index]}`, 'font-weight: bold');
    console.info(parseURL(urlArray[index]));
}