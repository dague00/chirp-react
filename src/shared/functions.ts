/**
 * DynamoDB scan responses have the unweildy form
 * 
 * ```
 * {  key0: { type0: val0 },
 *    key1: { type1: val1 },
 *    key2: [
 *      {arr0_type: arr0_val},
 *      {arr1_type: arr1_val}
 *    ], //etc 
 * }
 * ```
 * 
 * This function takes an object of that form as its argument and returns
 * 
 * ```
 * {  key0: val0,
 *    key1: val1,
 *    key2: [arr0_val, arr1_val] //etc
 * }
 * ```
 * 
 * ```formatScanResponse``` is typically used in the following manner:
 * 
 * ```
 * ddb = new DynamoDBClient(config);
 * const scan = await ddb.send(new ScanCommand(params));
 * const formatted = scan.Items.map(formatScanResponse);
 * ```
 * 
 * @param scanResponse 
 * @returns 
 */
export function formatScanResponse(scanResponse: Object){
  let formattedScanResponse:any = {};
  for (const [key, value] of Object.entries(scanResponse)){
    if ( isEmptyArr(value) || isPrimitive(value) || isArrayOfPrimitives(value)){
      formattedScanResponse[key] = value;
    } else {
      //Object.entries(value) expected to have form [ [type, val ] ]
      const nestedValue = Object.entries(value)[0][1];
      if (Array.isArray(nestedValue)){
        formattedScanResponse[key] = formatArray(nestedValue);
      } else {
        formattedScanResponse[key] = nestedValue;
      }
    }  
  }
  return formattedScanResponse;
}

/**
 * Takes variable, returns true if primitive type, false otherwise.
 * 
 * @param value 
 * @returns 
 */
export function isPrimitive(value: any){
  return typeof value !== 'object';
}

/**
 * Takes array, returns true if all elements are primitives, false otherwise.
 * 
 * @param arr 
 * @returns 
 */
function isArrayOfPrimitives(arr: any[]) {
  return Array.isArray(arr) && arr.every(i => isPrimitive(i));
}

/**
 * Takes array, returns true if empty, false otherwise
 * 
 * @param arr 
 * @returns 
 */
export function isEmptyArr(arr: any[]){
  return Array.isArray(arr) && arr.length===0;
}

/**
 * Parameter is array of form
 * 
 * ``` 
 * [
 *  {type0: val0},
 *  {type1: val1}, ...
 * ]
 * ```
 * 
 * Return is array of form
 * 
 * ```
 *  [val0, val1, ...]
 * ```
 * 
 * @param arr 
 * @returns 
 */
export function formatArray(arr: any[]) {
  let formattedArr = [];
  for (const x of arr){
    if ( isPrimitive(x) ){
      formattedArr.push(x); //if element is already formatted
    } else {
    //Object.entries(x) expected to have form [ [ arr_type, arr_val ] ] 
    formattedArr.push(Object.entries(x)[0][1]);
    }
  }
  return formattedArr;
}