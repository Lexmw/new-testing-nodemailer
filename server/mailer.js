require('dotenv').config();
var nodemailer = require('nodemailer');

module.exports = (requestObject) => {
  // create the message header
  var message = '<div style="max-width: 800px;"><h3>New Dealer Registration</h3>';
  var sendTo, printedName, signedDate;
  var attachments = [];

  // add all of the form fields to the message text
  Object.entries(requestObject.body).forEach(
    formField => {
      if(formField[0] == 'testing-sendTo') {
        sendTo = formField[1];
      } else if(formField[0] == 'signature' ) {
        attachments.push({
          filename: 'signature.png',
          content: new Buffer(formField[1].split(',')[1], 'base64'),
          cid: 'signature'
        })
      } else if(formField[0] == 'Printed Name') {
        printedName = formField[1];
      } else if(formField[0] == 'Dated') {
        signedDate = formField[1];
      } else if(formField[1] != '' && formField[1] != '-' && formField[1] != '- ' && formField[0] != 'terms-check') {
        message += `${formField[0]}: ${formField[1]} <br>`;
      } 
    }
  );

  // add all of the files to the attachment array
  if(requestObject.files) {
    if (!Array.isArray(requestObject.files.photos)) {
      attachments.push({
        filename: requestObject.files.photos.name,
        content: requestObject.files.photos.data
      })
    } else {
      Object.entries(requestObject.files.photos).forEach(
        photoArr => {
          attachments.push({
            filename: photoArr[1].name,
            content: photoArr[1].data,
          });
        }
      );
    }
  }

  // add the terms and conditions
  message += '<meta content="text/html; charset=UTF-8" http-equiv="content-type">'
  message += '<style type="text/css">ol.lst-kix_list_1-3{list-style-type:none}ol.lst-kix_list_1-4{list-style-type:none}ol.lst-kix_list_1-5{list-style-type:none}ol.lst-kix_list_1-6{list-style-type:none}ol.lst-kix_list_1-0{list-style-type:none}.lst-kix_list_1-4>li{counter-increment:lst-ctn-kix_list_1-4}ol.lst-kix_list_1-1{list-style-type:none}ol.lst-kix_list_1-2{list-style-type:none}ol.lst-kix_list_1-6.start{counter-reset:lst-ctn-kix_list_1-6 0}.lst-kix_list_1-1>li{counter-increment:lst-ctn-kix_list_1-1}ol.lst-kix_list_1-3.start{counter-reset:lst-ctn-kix_list_1-3 0}ol.lst-kix_list_1-2.start{counter-reset:lst-ctn-kix_list_1-2 0}ol.lst-kix_list_1-8.start{counter-reset:lst-ctn-kix_list_1-8 0}.lst-kix_list_1-0>li:before{content:"(" counter(lst-ctn-kix_list_1-0,lower-latin) ") "}ol.lst-kix_list_1-5.start{counter-reset:lst-ctn-kix_list_1-5 0}ol.lst-kix_list_1-7{list-style-type:none}.lst-kix_list_1-1>li:before{content:"(" counter(lst-ctn-kix_list_1-1,lower-roman) ") "}.lst-kix_list_1-2>li:before{content:"(" counter(lst-ctn-kix_list_1-2,decimal) ") "}.lst-kix_list_1-7>li{counter-increment:lst-ctn-kix_list_1-7}ol.lst-kix_list_1-8{list-style-type:none}.lst-kix_list_1-3>li:before{content:"" counter(lst-ctn-kix_list_1-3,lower-latin) ") "}.lst-kix_list_1-4>li:before{content:"" counter(lst-ctn-kix_list_1-4,lower-roman) ") "}ol.lst-kix_list_1-0.start{counter-reset:lst-ctn-kix_list_1-0 0}.lst-kix_list_1-0>li{counter-increment:lst-ctn-kix_list_1-0}.lst-kix_list_1-6>li{counter-increment:lst-ctn-kix_list_1-6}.lst-kix_list_1-7>li:before{content:"" counter(lst-ctn-kix_list_1-7,lower-roman) ". "}.lst-kix_list_1-3>li{counter-increment:lst-ctn-kix_list_1-3}.lst-kix_list_1-5>li:before{content:"" counter(lst-ctn-kix_list_1-5,decimal) ") "}.lst-kix_list_1-6>li:before{content:"" counter(lst-ctn-kix_list_1-6,lower-latin) ". "}ol.lst-kix_list_1-7.start{counter-reset:lst-ctn-kix_list_1-7 0}.lst-kix_list_1-2>li{counter-increment:lst-ctn-kix_list_1-2}.lst-kix_list_1-5>li{counter-increment:lst-ctn-kix_list_1-5}.lst-kix_list_1-8>li{counter-increment:lst-ctn-kix_list_1-8}ol.lst-kix_list_1-4.start{counter-reset:lst-ctn-kix_list_1-4 0}.lst-kix_list_1-8>li:before{content:"" counter(lst-ctn-kix_list_1-8,decimal) ". "}ol.lst-kix_list_1-1.start{counter-reset:lst-ctn-kix_list_1-1 0}ol{margin:0;padding:0}table td,table th{padding:0}.c2{margin-left:36pt;padding-top:0pt;padding-left:0pt;padding-bottom:0pt;line-height:1.0;orphans:2;widows:2;text-align:left}.c4{color:#000000;font-weight:700;text-decoration:none;vertical-align:baseline;font-size:11pt;font-family:"Arial";font-style:normal}.c0{color:#000000;font-weight:400;text-decoration:none;vertical-align:baseline;font-size:11pt;font-family:"Arial";font-style:normal}.c5{padding-top:0pt;padding-bottom:0pt;line-height:1.1500000000000001;orphans:2;widows:2;text-align:left;height:11pt}.c1{padding-top:0pt;padding-bottom:8pt;line-height:1.0;orphans:2;widows:2;text-align:left}.c7{text-decoration-skip-ink:none;-webkit-text-decoration-skip:none;color:#1155cc;text-decoration:underline}.c3{background-color:#ffffff;max-width:468pt;padding:72pt 72pt 72pt 72pt}.c10{margin-left:36pt;padding-left:0pt}.c8{color:inherit;text-decoration:inherit}.c9{padding:0;margin:0}.c6{font-size:9pt}.title{padding-top:0pt;color:#000000;font-size:26pt;padding-bottom:3pt;font-family:"Arial";line-height:1.1500000000000001;page-break-after:avoid;orphans:2;widows:2;text-align:left}.subtitle{padding-top:0pt;color:#666666;font-size:15pt;padding-bottom:16pt;font-family:"Arial";line-height:1.1500000000000001;page-break-after:avoid;orphans:2;widows:2;text-align:left}li{color:#000000;font-size:11pt;font-family:"Arial"}p{margin:0;color:#000000;font-size:11pt;font-family:"Arial"}h1{padding-top:20pt;color:#000000;font-size:20pt;padding-bottom:6pt;font-family:"Arial";line-height:1.1500000000000001;page-break-after:avoid;orphans:2;widows:2;text-align:left}h2{padding-top:18pt;color:#000000;font-size:16pt;padding-bottom:6pt;font-family:"Arial";line-height:1.1500000000000001;page-break-after:avoid;orphans:2;widows:2;text-align:left}h3{padding-top:16pt;color:#434343;font-size:14pt;padding-bottom:4pt;font-family:"Arial";line-height:1.1500000000000001;page-break-after:avoid;orphans:2;widows:2;text-align:left}h4{padding-top:14pt;color:#666666;font-size:12pt;padding-bottom:4pt;font-family:"Arial";line-height:1.1500000000000001;page-break-after:avoid;orphans:2;widows:2;text-align:left}h5{padding-top:12pt;color:#666666;font-size:11pt;padding-bottom:4pt;font-family:"Arial";line-height:1.1500000000000001;page-break-after:avoid;orphans:2;widows:2;text-align:left}h6{padding-top:12pt;color:#666666;font-size:11pt;padding-bottom:4pt;font-family:"Arial";line-height:1.1500000000000001;page-break-after:avoid;font-style:italic;orphans:2;widows:2;text-align:left}</style>'
  message += '<body class="c3"><p class="c1"><span class="c0">Additional Terms &amp; Conditions governing the relationship with S&amp;B are found at www.sbfilters.com/terms (the &ldquo;Terms &amp; Conditions&rdquo;), which are specifically incorporated herein by this reference and maybe updated from time to time. THIS AGREEMENT is made as of the Effective Date (as defined on the signature page) by and between S&amp;B Filters, Inc. (&ldquo;S&amp;B&rdquo;), a California corporation located at the address shown on the signature page, and the Dealer (as defined above) located at the address shown above.</span></p><p class="c1"><span class="c4">1. Appointment.</span></p><p class="c1"><span class="c0">Subject to the terms and conditions of this Agreement, S&amp;B appoints the Dealer and the Dealer agrees to perform as S&amp;B&rsquo;s Nonexclusive Authorized Dealer for the Products during the Term. (For certain definitions of capitalized terms, see Section 5 of this Agreement.) Except as expressly authorized in writing by S&amp;B, the Dealer agrees to submit orders for items(s) of the Products to one or more of the Distributors during the Term and, subject to the prices and terms and conditions of sale determined between the Dealer and each such Distributor (but consistent with this Agreement) to purchase from such Distributor such items(s) described in each order.</span></p><p class="c1"><span class="c4">2. Responsibilities.</span></p><p class="c1"><span class="c0">Except as otherwise approved in writing in advance by S&amp;B, the Dealer will comply following: (a) promote the sale and use of the Products; (b) promptly and effectively respond to questions and service requests from customers and prospective customers; (c) represent the Products in an ethical and professional manner and refrain from any conduct that is or could be detrimental to the reputation or integrity of the Dealer, Distributor and/or S&amp;B; (d) use the Intellectual Property only as permitted and approved by S&amp;B; (e) refrain from challenging, directly or indirect, S&amp;B&rsquo;s or its Affiliate(s)&rsquo; legal rights in the Intellectual Property or assisting, in any third party in doing so; (f) comply with all laws and all of the S&amp;B Policies; and (g) promptly comply with any request made by S&amp;B or the Distributors relating to any law or expectation thereof or the modification or recall of any or all of the Products. Any and all inquires or questions regarding Authorized Dealer Program Unilateral Pricing Policy must be directed to only Berry Carter, President, at 909-947-0015 or adp@sbfilters.com.</span></p><p class="c1"><span class="c4">3. Termination.</span></p><p class="c1"><span class="c0">This Agreement will terminate effective upon written notice by either Party to the other Party. &nbsp;Upon termination of this Agreement, the Dealer shall immediately cease holding himself or itself out as a Dealer, or any conduct that would give the impression that the Dealer is an authorized dealer or representative of S&amp;B or for the Products or has any affiliation whatsoever with S&amp;B or the Products, provided, however, the Dealer may sell its inventory of the Products existing as of the termination, subject to the terms of this Agreement.</span></p><p class="c1"><span class="c4">4. Miscellaneous.</span></p><ol class="c9 lst-kix_list_1-0 start" start="1"><li class="c2"><span>This Agreement and any and all duties and obligations hereunder may not be delegated, transferred or assigned by the Dealer without the express written consent of S&amp;B. Each delegation, transfer or assignment by the Dealer without such consent shall be null and void. The relationship between S&amp;B and the Dealer shall be that of independent contractors, and nothing in this Agreement shall constitute or be deemed to constitute a partnership, joint venture or franchise between S&amp;B and the Dealer, nor shall the Dealer be deemed or authorized an agent of S&amp;B for any purpose whatsoever. The Dealer shall have no authority or power to bind S&amp;B or to contract in the name of and create a liability against S&amp;B in any way for any purpose.</span></li><li class="c2"><span>At any time, at its sole discretion, and without prior notice: (i) S&amp;B may modify any or all of the S&amp;B Policies and (ii) any or all item(s) of the Products may change, in which case, the Dealer acknowledges and agrees that each of the Distributors may without liability or penalty cancel all pending orders (even if accepted from the Dealer for such changed item(s)) and refuse to accept any new orders from the Dealer for such item(s). Except as otherwise expressly provided in this Agreement, each modification of the S&amp;B Policies shall be effective immediately, unless S&amp;B notifies the Dealer in writing of another effective date. S&amp;B&rsquo;s interpretation of each of the S&amp;B Policies will control.</span></li><li class="c2"><span>This Agreement shall be governed by and interpreted under the laws of the State of California without regard to that state&rsquo;s conflicts of laws provisions. Any and all disputes arising out of or relating in any way to this Agreement between the Parties (or the Affiliate(s) of either) shall be litigated at the trial level as a bench trial only in federal or state court in County of San Bernardino, California. The Parties hereby expressly waive their right to a jury trial. The Dealer, on behalf of itself and its Affiliate(s) hereby submits to personal and subject matter jurisdiction in such courts and agrees that neither the Dealer nor the Dealer&rsquo;s Affiliate(s) will contest venue.</span></li><li class="c2"><span>Time is of the essence of this Agreement. This Agreement shall be deemed to reflect the mutual intent of the Parties, and no rule of strict construction shall be applied against either Party. S&amp;B shall not be liable for loss, damage or delay resulting from any cause whatsoever beyond its reasonable control. In the event of any conflict between the S&amp;B Policies and this Agreement, the S&amp;B Policies will control. Wherever required by the context hereof, each pronoun used herein shall be deemed to include both the singular and the plural and to encompass each gender. </span></li><li class="c2"><span>If applicable law contains any requirement that is contrary to, conflicts with or is missing from any provision(s) or part(s) thereof in this Agreement, S&amp;B, at any time, may elect by written notice to the Dealer (effective upon receipt thereof or as otherwise designated by S&amp;B therein) that: (i) such requirement be substituted for or added to such provision(s) or part(s) thereof to the minimum extent necessary to validate such provision(s) or part(s) thereof or (ii) this Agreement be terminated. If any provision(s) or part(s) thereof in this Agreement shall be held invalid, the remainder of this Agreement shall continue in full force and effect, and each such provision or part thereof shall be deemed not to be part of this Agreement.</span></li><li class="c2"><span>This Agreement and each of the S&amp;B Policies, as modified from time to time: (i) constitute the entire understanding of the Parties binding upon them; (ii) are intended to govern the relationship between the Parties; (iii) supersede all agreements, representations or statements between the Parties, either oral or written; and (iv) except as otherwise provided herein, may be amended or modified only by a written supplement, duty executed by both of the Parties.</span></li><li class="c2"><span>Except as otherwise provided in this Agreement or as the Parties otherwise may expressly agree in writing, no failure, refusal, neglect, delay, waiver, forbearance or omission by S&amp;B to exercise any right(s) under this Agreement or to insist upon full compliance by the Dealer with the Dealer&rsquo;s duties, obligations or restrictions hereunder shall constitute a</span><span class="c6">&nbsp;</span><span>novation or waiver of any provision(s) of this Agreement or otherwise thereafter limit S&amp;B&rsquo;s right to fully enforce any or all of the provision(s) and part(s) thereof of this Agreement.</span></li>'
  message += '<li class="c2"><span>The following shall survive the termination of this Agreement: (i) Sections 1 and 2(c) through 5 of this Agreement; (ii) each of the definitions contained in this Agreement; and (iii) each of the S&amp;B Policies which by its own terms expressly states that it survives the termination of this Agreement or which S&amp;B otherwise designates as so surviving.</span></li><li class="c2"><span>Each notice described in this Agreement to either Party must be in writing and shall be sent to the intended recipient (with all fees paid) by certified mail, express courier service, facsimile or e-mail to such recipient&rsquo;s address referred to on the first (1st) page of this Agreement and shall be considered effective or received when actually received or refused by such recipient, provided that the sending Party has written confirmation thereof and such refusal was not due to electronic or mechanical malfunction or failure.</span></li><li class="c2"><span>LIMITATION OF LIABILITY: IN NO EVENT SHALL S&amp;B, OR ITS OFFICERS, DIRECTORS, SHAREHOLDERS, EMPLOYEES, OR ASSIGNS (&ldquo;S&amp;B PARTIES&rdquo;) BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES ARISING OUT OF OR IN CONNECTION WITH THE PRODUCTS OR SERVICES OFFERED BY S&amp;B, INCLUDING, WITHOUT LIMITATION, ANY DAMAGES RESULTING FROM LOSS OF USE, DATA, OR PROFITS, WHETHER OR NOT S&amp;B HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES, OR FOR ANY DAMAGES FOR PERSONAL OR BODILY INJURY OR EMOTIONAL DISTRESS ARISING OUT OF OR IN CONNECTION WITH THE PRODUCTS OR THESE TERMS, ON ANY THEORY OF LIABILITY, WHETHER BASED ON WARRANTY, COPYRIGHT, CONTRACT, TORT (INCLUDING NEGLIGENCE), PRODUCT LIABILITY OR ANY OTHER LEGAL THEORY.</span></li><li class="c2"><span>Dealer agrees to indemnify and hold S&amp;B Parties harmless from any losses, costs, liabilities and expenses (including reasonable attorneys&rsquo; fees) relating to or arising out of: (a) your marketing and sale of the Products; or (b) your violation of this Agreement. S&amp;B reserves the right, at its own cost, to assume the exclusive defense and control of any matter otherwise subject to indemnification by Dealer, in which event Dealer will fully cooperate with S&amp;B in asserting any available defenses. You agree that the provisions in this section will survive any termination of this Agreement.</span></li><li class="c1 c10"><span>Dealer acknowledge that in its &nbsp;performance of its &nbsp;duties under this Agreement, Dealer will may receive certain confidential and proprietary information belonging to S&amp;B, including without limitation information concerning the Products, future Products, the know-how, technology, techniques, or business or marketing plans thereto (collectively, the &ldquo;Confidential Information&rdquo;) all of which are confidential and proprietary to, and trade secrets of, S&amp;B. Confidential Information does not include information that: (i) is public knowledge at the time of disclosure by S&amp;B; (ii) becomes public knowledge or known to the Dealer after disclosure by S&amp;B other than by breach of the Dealer&rsquo;s obligations under this section or by breach of a third party&rsquo;s confidentiality obligations; (iii) was known by the Dealer prior to disclosure by S&amp;B other than by breach of a third party&rsquo;s confidentiality obligations; or (iv) is independently developed by the Dealer. As a condition to receipt of the Confidential Information from S&amp;B, the Dealer shall: (i) not disclose in any manner, directly or indirectly, to any third party any portion of S&amp;B&rsquo;s Confidential Information; (ii) not use S&amp;B&rsquo;s Confidential Information in any fashion except in accordance with this Agreement or with S&amp;B&rsquo;s expressed prior written consent; (iii) disclose S&amp;B&rsquo;s Confidential Information, in whole or part, only to employees and agents who need to have access thereto for the Dealer&rsquo;s internal business purposes; (iv) take all necessary steps to ensure that its employees and agents are informed of and comply with the confidentiality restrictions contained in this Agreement; and (v) take all necessary precautions to protect the confidentiality of the Confidential Information received hereunder and exercise at least the same degree of care in safeguarding the Confidential Information as Dealer would with its own confidential information, and in no event shall apply less than a reasonable standard of care to prevent disclosure. The Dealer shall promptly notify S&amp;B of any unauthorized disclosure or use of the Confidential Information. The Dealer shall cooperate and assist S&amp;B in preventing or remedying and such unauthorized use or disclosure.</span></li></ol><p class="c1"><span class="c4">5. Certain Definitions:</span></p><p class="c1"><span>For purposes of this Agreement: (a) &ldquo;Nonexclusive Authorized Dealer&rdquo; means that the Dealer may hold itself out as a non-exclusive dealer authorized by S&amp;B for the Products during the Term; (b) the &ldquo;Products&rdquo; means those products made available to the Dealer by any or all Distributors specifically authorized by S&amp;B to sell to the Dealer; (c) the &ldquo;Term&rdquo; means the period from the Effective Date until this Agreement is terminated pursuant to Section 3 hereof; (d) the &ldquo;Intellectual Property&rdquo; means any or all of the patents, designs, trademarks, service marks, trade names, commercial</span><span class="c6">&nbsp;</span><span class="c0">symbols, copyrights, data, databases, market information, trade secrets and confidential information in which S&amp;B or its Affiliate(s) claim(s) rights; (e) &ldquo;Affiliate(s)&rdquo; means any or all of the individual(s), entity and entities controlling, controlled by or under common control with the Party identified; (f) the &ldquo;S&amp;B Policies&rdquo; means collectively the then-current version(s) of the announcements and policies (whether in the form of correspondence, memoranda, notices or otherwise) from time to time issued in writing or made available electronically by S&amp;B to the Dealer and not expressly excluded by S&amp;B from the S&amp;B Policies; and (g) a &ldquo;Party&rdquo; means S&amp;B or the Dealer and the &ldquo;Parties&rdquo; means S&amp;B and the Dealer.</span></p><p class="c1"><span class="c4">6. Additional Terms &amp; Conditions:</span></p><p class="c1"><span>Additional Terms &amp; Conditions governing the relationship with S&amp;B is found at </span><span class="c7"><a class="c8" href="https://www.google.com/url?q=http://www.sbfilters.com&amp;sa=D&amp;ust=1588109458152000">www.sbfilters.com</a></span><span class="c0">&nbsp;(the &ldquo;Terms &amp; Conditions&rdquo;), which is specifically incorporated herein by this reference and may be updated from time to time.</span></p><p class="c1"><span class="c4">7. Choice of Law, Fees &amp; Costs:</span></p><p class="c1"><span class="c0">This Agreement shall be construed under and in accordance with the laws of the State of California without reference to conflicts of law principles. Any suit, action or proceeding to determine, construe or enforce any provision of this Agreement, or the rights of any Party hereunder, shall be brought in the County of Los Angeles, State of California, and all parties agree that jurisdiction shall lie therein. In the event of an action to enforce any aspect of this Agreement and/or any action arising from this Agreement, the prevailing party in any such action shall be entitled to recover their reasonable attorneys&rsquo; fees and costs in connection with any such proceeding.</span></p><p class="c1"><span class="c0">Each Party, intending this Agreement to be effective as of the Effective Date, has caused this Agreement to be executed by its duly authorized representative.</span></p><p class="c5"><span class="c0"></span></p></body></html>'

  // embed the signature
  message += `<img src="cid:signature" style="max-width: 400px;"><br><div>Signed by ${printedName} on ${signedDate}</div></div>`

  // initialize transport object with email credentials
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  // configure the message
  const mailOptions = {
    from: 'sbdealerform@gmail.com', 
    to: "wes@sdcs.io", // customerservice@sbfilters.com
    subject: `New Dealer Registration - ${printedName}`,
    html: message, // message text variable
    attachments: attachments // attachment array
  };

  // send the message, listen for error
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  }); 

}