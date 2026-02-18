import fs from 'fs'
import { XMLParser } from 'fast-xml-parser'



function XmlParser(path: string){

    const file = fs.readFileSync(path, {encoding: 'utf-8'})
    const xmlParser = new XMLParser({ignoreAttributes: false, attributeNamePrefix:""})

    const parsedXML = xmlParser.parse(file)

   return parsedXML;
}

export {XmlParser}