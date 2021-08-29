"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applySignature = exports.currentSignatureId = exports.currentSignatureIdSlate = void 0;
const mailspring_exports_1 = require("mailspring-exports");
function numberOfTrailingBRs(text) {
    let count = 0;
    text = text.trim();
    // eslint-disable-next-line no-constant-condition
    while (true) {
        if (text.endsWith('<br/>')) {
            text = text.substr(0, text.length - 5);
        }
        else if (text.endsWith('<div></div>')) {
            text = text.substr(0, text.length - 11);
        }
        else {
            break;
        }
        text = text.trim();
        count++;
    }
    return count;
}
function currentSignatureIdSlate(value) {
    const sigNode = value.document
        .getBlocksByType('uneditable')
        .toArray()
        .find(a => a.data.get('html').startsWith('<signature '));
    if (!sigNode)
        return null;
    const signatureRegex = mailspring_exports_1.RegExpUtils.mailspringSignatureRegex();
    const signatureMatch = signatureRegex.exec(sigNode.data.get('html'));
    return signatureMatch && signatureMatch[1];
}
exports.currentSignatureIdSlate = currentSignatureIdSlate;
function currentSignatureId(body) {
    let replyEnd = body.search(mailspring_exports_1.RegExpUtils.nativeQuoteStartRegex());
    if (replyEnd === -1) {
        replyEnd = body.length;
    }
    const signatureRegex = mailspring_exports_1.RegExpUtils.mailspringSignatureRegex();
    const signatureMatch = signatureRegex.exec(body.substr(0, replyEnd));
    return signatureMatch && signatureMatch[1];
}
exports.currentSignatureId = currentSignatureId;
function applySignature(body, signature) {
    // Remove any existing signature in the body
    let additionalWhitespace = '<br/>';
    let newBody = body;
    if (currentSignatureId(body)) {
        newBody = newBody.replace(mailspring_exports_1.RegExpUtils.mailspringSignatureRegex(), '');
        additionalWhitespace = ''; // never add whitespace when switching signatures
    }
    // http://www.regexpal.com/?fam=94390
    // prefer to put the signature one <br> before the beginning of the quote,
    // if possible.
    let insertionPoint = newBody.search(mailspring_exports_1.RegExpUtils.nativeQuoteStartRegex());
    if (insertionPoint === -1) {
        insertionPoint = newBody.length;
    }
    if (signature) {
        const contentBefore = newBody.slice(0, insertionPoint);
        const contentAfter = newBody.slice(insertionPoint);
        if (numberOfTrailingBRs(contentBefore) > 1) {
            additionalWhitespace = ''; // never add whitespace when we already have 2 spaces
        }
        return `${contentBefore}${additionalWhitespace}<signature id="${signature.id}">${signature.body}</signature>${contentAfter}`;
    }
    else {
        return newBody;
    }
}
exports.applySignature = applySignature;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmF0dXJlLXV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3NpZ25hdHVyZS11dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyREFBaUQ7QUFHakQsU0FBUyxtQkFBbUIsQ0FBQyxJQUFJO0lBQy9CLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztJQUNkLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDbkIsaURBQWlEO0lBQ2pELE9BQU8sSUFBSSxFQUFFO1FBQ1gsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQzFCLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ3hDO2FBQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQ3ZDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1NBQ3pDO2FBQU07WUFDTCxNQUFNO1NBQ1A7UUFDRCxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ25CLEtBQUssRUFBRSxDQUFDO0tBQ1Q7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFFRCxTQUFnQix1QkFBdUIsQ0FBQyxLQUFZO0lBQ2xELE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxRQUFRO1NBQzNCLGVBQWUsQ0FBQyxZQUFZLENBQUM7U0FDN0IsT0FBTyxFQUFFO1NBQ1QsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7SUFDM0QsSUFBSSxDQUFDLE9BQU87UUFBRSxPQUFPLElBQUksQ0FBQztJQUUxQixNQUFNLGNBQWMsR0FBRyxnQ0FBVyxDQUFDLHdCQUF3QixFQUFFLENBQUM7SUFDOUQsTUFBTSxjQUFjLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLE9BQU8sY0FBYyxJQUFJLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM3QyxDQUFDO0FBVkQsMERBVUM7QUFFRCxTQUFnQixrQkFBa0IsQ0FBQyxJQUFZO0lBQzdDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsZ0NBQVcsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLENBQUM7SUFDaEUsSUFBSSxRQUFRLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDbkIsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7S0FDeEI7SUFFRCxNQUFNLGNBQWMsR0FBRyxnQ0FBVyxDQUFDLHdCQUF3QixFQUFFLENBQUM7SUFDOUQsTUFBTSxjQUFjLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLE9BQU8sY0FBYyxJQUFJLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM3QyxDQUFDO0FBVEQsZ0RBU0M7QUFFRCxTQUFnQixjQUFjLENBQUMsSUFBSSxFQUFFLFNBQVM7SUFDNUMsNENBQTRDO0lBQzVDLElBQUksb0JBQW9CLEdBQUcsT0FBTyxDQUFDO0lBRW5DLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQztJQUNuQixJQUFJLGtCQUFrQixDQUFDLElBQUksQ0FBQyxFQUFFO1FBQzVCLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLGdDQUFXLENBQUMsd0JBQXdCLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN0RSxvQkFBb0IsR0FBRyxFQUFFLENBQUMsQ0FBQyxpREFBaUQ7S0FDN0U7SUFFRCxxQ0FBcUM7SUFDckMsMEVBQTBFO0lBQzFFLGVBQWU7SUFDZixJQUFJLGNBQWMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLGdDQUFXLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxDQUFDO0lBQ3pFLElBQUksY0FBYyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ3pCLGNBQWMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO0tBQ2pDO0lBRUQsSUFBSSxTQUFTLEVBQUU7UUFDYixNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUN2RCxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ25ELElBQUksbUJBQW1CLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzFDLG9CQUFvQixHQUFHLEVBQUUsQ0FBQyxDQUFDLHFEQUFxRDtTQUNqRjtRQUVELE9BQU8sR0FBRyxhQUFhLEdBQUcsb0JBQW9CLGtCQUFrQixTQUFTLENBQUMsRUFBRSxLQUFLLFNBQVMsQ0FBQyxJQUFJLGVBQWUsWUFBWSxFQUFFLENBQUM7S0FDOUg7U0FBTTtRQUNMLE9BQU8sT0FBTyxDQUFDO0tBQ2hCO0FBQ0gsQ0FBQztBQTdCRCx3Q0E2QkMifQ==