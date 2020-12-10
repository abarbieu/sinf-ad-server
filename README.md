# sinf-ad-server
Stress Induced Nightmare Fuel ad/content server and editor for IFixit

### This was a qarter long class project for CSC-307: Intro to Software Engineering. 

## API Documentation

**<span style="text-decoration:underline;">DRY Points</span>**



1. All URLs are expected to be prefixed with [https://domain.ext/api](https://domain.ext/api)
2. All responses are in JSON form
3. Any data in path like: /{} is a request parameter, all else is in the body
4. All response codes are in line with the Mozilla standard 
    1. [https://developer.mozilla.org/en-US/docs/Web/HTTP/Status](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

    **<span style="text-decoration:underline;">Ad Data Object</span>**

*   `adId`
    *   Stored in ad inventory with primary key as unique ad id/name
*   <code>adName <em>(63 char max)</em></code>
    *   User given name of the ad
*   <code>imageLoc</code>
    *   The path where the image is located
*   <code>mainText <em>(63 char max)</em></code>
    *   User given main ad text
*   <code>subText <em>(255 char max)</em></code>
    *   User given secondary text
*   <code>linkText</code>
    *   The text displayed that will act as a link
*   <code>linkLoc <em>(255 char max)</em></code>
    *    The http link to where the ad should redirect to
*   <code>Height</code>
    *   Pixels 
*   <code>Width</code>
    *   Pixels 
*   <code>flightId</code>
    *   Flight id. String identifier of one of the available flights

    <strong><span style="text-decoration:underline;">Ad Stats Object</span></strong>

*   `adId`
    *   As in ad data object
*   `adName`
    *   As in ad data object
    *   `flightId`
    *   As in ad data object
*   `impressions`
*   `clicks`
*   `conversions`

**<span style="text-decoration:underline;">Decision API</span>**


```
    /decide
```



*   **GET**
    *   In body of request contain:
        *   _zoneSize_
        *   _deviceType_
    *   Returns an ad object with flight matching deviceType and size within zoneSize

**<span style="text-decoration:underline;">Inventory API </span>**


    ```
    /inventory
    ```



*   **POST**
    *   In body of request contain:
        *   _image (2mb max, binary data)_
        *   _Ad object as detailed above_
    *   Stores the ad image data in inventory storage
    *   Sends POST to /report/{adId}
    *   Returns a JSON object denoting POST status, adId, and all given data
*   **GET**
    *   Returns an array of all ad objects stored

    ```
    /inventory/{adId}
    ```


*   **GET**
    *   Returns the ad object with given adID
*   **PUT**
    *   Body contains a partially or entirely full ad object
    *   Given values will update existing values for ad with given adId
*   **DELETE**
    *   Deletes ad with adId
   ```
	/inventory/flights
   ```


*   **GET**
    *   Returns an array of all available flights 

    ```
    /inventory/flights/{flightId}
    ```

*   **GET**
    *   Returns an array of all ads in flight flights 

**<span style="text-decoration:underline;">Reporting API</span>**

     ```
    /reports/{adId}
    ```


*   **PUT**
    *   Takes in partially or entirely full ad stats object
    *   Updates previous stats with given stats for a specific ad.
*   **POST**
    *   Creates the first entry for a new ad with 0 for all stats
    *   Dev note: call this when putting a new ad in the inventory
*   **GET**
    *   Returns an ad stats object with given adId

    ```
    /reports/{flightId}
    ```


*   **GET**
    *   Returns array of ad stats objects which all have given flightId
