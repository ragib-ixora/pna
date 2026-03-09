(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,33525,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"warnOnce",{enumerable:!0,get:function(){return s}});let s=e=>{}},99833,e=>{"use strict";e.s(["ATTENDANCE_STATUS_COLORS",0,{present:{bg:"bg-emerald-50",text:"text-emerald-700",dot:"bg-emerald-500"},absent:{bg:"bg-red-50",text:"text-red-700",dot:"bg-red-500"},half_day:{bg:"bg-amber-50",text:"text-amber-700",dot:"bg-amber-500"},late:{bg:"bg-orange-50",text:"text-orange-700",dot:"bg-orange-500"},wfh:{bg:"bg-blue-50",text:"text-blue-700",dot:"bg-blue-500"},on_leave:{bg:"bg-purple-50",text:"text-purple-700",dot:"bg-purple-500"},holiday:{bg:"bg-pink-50",text:"text-pink-700",dot:"bg-pink-500"},weekend:{bg:"bg-slate-50",text:"text-slate-500",dot:"bg-slate-400"}},"ATTENDANCE_STATUS_LABELS",0,{present:"Present",absent:"Absent",half_day:"Half Day",late:"Late",wfh:"Work From Home",on_leave:"On Leave",holiday:"Holiday",weekend:"Weekend"},"LEAVE_TYPE_COLORS",0,{annual:"bg-blue-100 text-blue-800",sick:"bg-red-100 text-red-800",casual:"bg-green-100 text-green-800",unpaid:"bg-gray-100 text-gray-800",maternity:"bg-pink-100 text-pink-800",paternity:"bg-indigo-100 text-indigo-800",wfh:"bg-cyan-100 text-cyan-800",comp_off:"bg-orange-100 text-orange-800",bereavement:"bg-slate-100 text-slate-800",marriage:"bg-rose-100 text-rose-800"},"LEAVE_TYPE_LABELS",0,{annual:"Annual Leave",sick:"Sick Leave",casual:"Casual Leave",unpaid:"Unpaid Leave",maternity:"Maternity Leave",paternity:"Paternity Leave",wfh:"Work From Home",comp_off:"Compensatory Off",bereavement:"Bereavement Leave",marriage:"Marriage Leave"},"STATUS_COLORS",0,{pending:"bg-warning/10 text-warning",approved:"bg-success/10 text-success",rejected:"bg-destructive/10 text-destructive",cancelled:"bg-muted text-muted-foreground"}])},40160,e=>{"use strict";let t=(0,e.i(75254).default)("download",[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]]);e.s(["Download",()=>t],40160)},47627,e=>{"use strict";var t=e.i(43476),a=e.i(47163);function s({className:e,...s}){return(0,t.jsx)("div",{"data-slot":"table-container",className:"relative w-full overflow-x-auto",children:(0,t.jsx)("table",{"data-slot":"table",className:(0,a.cn)("w-full caption-bottom text-sm",e),...s})})}function r({className:e,...s}){return(0,t.jsx)("thead",{"data-slot":"table-header",className:(0,a.cn)("[&_tr]:border-b",e),...s})}function n({className:e,...s}){return(0,t.jsx)("tbody",{"data-slot":"table-body",className:(0,a.cn)("[&_tr:last-child]:border-0",e),...s})}function l({className:e,...s}){return(0,t.jsx)("tr",{"data-slot":"table-row",className:(0,a.cn)("hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",e),...s})}function i({className:e,...s}){return(0,t.jsx)("th",{"data-slot":"table-head",className:(0,a.cn)("text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",e),...s})}function o({className:e,...s}){return(0,t.jsx)("td",{"data-slot":"table-cell",className:(0,a.cn)("p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",e),...s})}e.s(["Table",()=>s,"TableBody",()=>n,"TableCell",()=>o,"TableHead",()=>i,"TableHeader",()=>r,"TableRow",()=>l])},27341,e=>{"use strict";var t=e.i(43476),a=e.i(71645),s=e.i(81140),r=e.i(30030),n=e.i(42727),l=e.i(96626),i=e.i(48425),o=e.i(86318),d=e.i(69340),c=e.i(10772),u="Tabs",[m,x]=(0,r.createContextScope)(u,[n.createRovingFocusGroupScope]),h=(0,n.createRovingFocusGroupScope)(),[f,g]=m(u),b=a.forwardRef((e,a)=>{let{__scopeTabs:s,value:r,onValueChange:n,defaultValue:l,orientation:m="horizontal",dir:x,activationMode:h="automatic",...g}=e,b=(0,o.useDirection)(x),[p,v]=(0,d.useControllableState)({prop:r,onChange:n,defaultProp:l??"",caller:u});return(0,t.jsx)(f,{scope:s,baseId:(0,c.useId)(),value:p,onValueChange:v,orientation:m,dir:b,activationMode:h,children:(0,t.jsx)(i.Primitive.div,{dir:b,"data-orientation":m,...g,ref:a})})});b.displayName=u;var p="TabsList",v=a.forwardRef((e,a)=>{let{__scopeTabs:s,loop:r=!0,...l}=e,o=g(p,s),d=h(s);return(0,t.jsx)(n.Root,{asChild:!0,...d,orientation:o.orientation,dir:o.dir,loop:r,children:(0,t.jsx)(i.Primitive.div,{role:"tablist","aria-orientation":o.orientation,...l,ref:a})})});v.displayName=p;var y="TabsTrigger",j=a.forwardRef((e,a)=>{let{__scopeTabs:r,value:l,disabled:o=!1,...d}=e,c=g(y,r),u=h(r),m=D(c.baseId,l),x=C(c.baseId,l),f=l===c.value;return(0,t.jsx)(n.Item,{asChild:!0,...u,focusable:!o,active:f,children:(0,t.jsx)(i.Primitive.button,{type:"button",role:"tab","aria-selected":f,"aria-controls":x,"data-state":f?"active":"inactive","data-disabled":o?"":void 0,disabled:o,id:m,...d,ref:a,onMouseDown:(0,s.composeEventHandlers)(e.onMouseDown,e=>{o||0!==e.button||!1!==e.ctrlKey?e.preventDefault():c.onValueChange(l)}),onKeyDown:(0,s.composeEventHandlers)(e.onKeyDown,e=>{[" ","Enter"].includes(e.key)&&c.onValueChange(l)}),onFocus:(0,s.composeEventHandlers)(e.onFocus,()=>{let e="manual"!==c.activationMode;f||o||!e||c.onValueChange(l)})})})});j.displayName=y;var N="TabsContent",T=a.forwardRef((e,s)=>{let{__scopeTabs:r,value:n,forceMount:o,children:d,...c}=e,u=g(N,r),m=D(u.baseId,n),x=C(u.baseId,n),h=n===u.value,f=a.useRef(h);return a.useEffect(()=>{let e=requestAnimationFrame(()=>f.current=!1);return()=>cancelAnimationFrame(e)},[]),(0,t.jsx)(l.Presence,{present:o||h,children:({present:a})=>(0,t.jsx)(i.Primitive.div,{"data-state":h?"active":"inactive","data-orientation":u.orientation,role:"tabpanel","aria-labelledby":m,hidden:!a,id:x,tabIndex:0,...c,ref:s,style:{...e.style,animationDuration:f.current?"0s":void 0},children:a&&d})})});function D(e,t){return`${e}-trigger-${t}`}function C(e,t){return`${e}-content-${t}`}T.displayName=N;var w=e.i(47163);function k({className:e,...a}){return(0,t.jsx)(b,{"data-slot":"tabs",className:(0,w.cn)("flex flex-col gap-2",e),...a})}function S({className:e,...a}){return(0,t.jsx)(v,{"data-slot":"tabs-list",className:(0,w.cn)("bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",e),...a})}function M({className:e,...a}){return(0,t.jsx)(j,{"data-slot":"tabs-trigger",className:(0,w.cn)("data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",e),...a})}function A({className:e,...a}){return(0,t.jsx)(T,{"data-slot":"tabs-content",className:(0,w.cn)("flex-1 outline-none",e),...a})}e.s(["Tabs",()=>k,"TabsContent",()=>A,"TabsList",()=>S,"TabsTrigger",()=>M],27341)},73375,63059,e=>{"use strict";var t=e.i(12012);e.s(["ChevronLeft",()=>t.default],73375);var a=e.i(46349);e.s(["ChevronRight",()=>a.default],63059)},19578,e=>{"use strict";var t=e.i(88594);function a(e,a,s){return(0,t.addMonths)(e,-a,s)}e.s(["subMonths",()=>a])},80797,e=>{"use strict";var t=e.i(77241),a=e.i(50516);function s(e,s){var r;return(0,a.isSameDay)((0,t.constructFrom)(s?.in||e,e),(r=s?.in||e,(0,t.constructFrom)(r,Date.now())))}e.s(["isToday",()=>s],80797)},91855,4003,e=>{"use strict";var t=e.i(45110);function a(e,a){let[s,r]=(0,t.normalizeDates)(e,a.start,a.end);return{start:s,end:r}}e.s(["normalizeInterval",()=>a],4003);var s=e.i(77241);function r(e,t){let{start:r,end:n}=a(t?.in,e),l=+r>+n,i=l?+r:+n,o=l?n:r;o.setHours(0,0,0,0);let d=t?.step??1;if(!d)return[];d<0&&(d=-d,l=!l);let c=[];for(;+o<=i;)c.push((0,s.constructFrom)(r,o)),o.setDate(o.getDate()+d),o.setHours(0,0,0,0);return l?c.reverse():c}e.s(["eachDayOfInterval",()=>r],91855)},50516,e=>{"use strict";var t=e.i(45110),a=e.i(85890);function s(e,s,r){let[n,l]=(0,t.normalizeDates)(r?.in,e,s);return+(0,a.startOfDay)(n)==+(0,a.startOfDay)(l)}e.s(["isSameDay",()=>s])},12012,e=>{"use strict";let t=(0,e.i(75254).default)("chevron-left",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);e.s(["default",()=>t])},33331,95727,e=>{"use strict";var t=e.i(77241),a=e.i(81092);function s(e,s,r){let n=(0,a.toDate)(e,r?.in);return isNaN(s)?(0,t.constructFrom)(r?.in||e,NaN):(s&&n.setDate(n.getDate()+s),n)}function r(e,t,a){return s(e,7*t,a)}e.s(["addDays",()=>s],95727),e.s(["addWeeks",()=>r],33331)},7935,e=>{"use strict";var t=e.i(55024),a=e.i(81092);function s(e,s){let r=(0,t.getDefaultOptions)(),n=s?.weekStartsOn??s?.locale?.options?.weekStartsOn??r.weekStartsOn??r.locale?.options?.weekStartsOn??0,l=(0,a.toDate)(e,s?.in),i=l.getDay();return l.setDate(l.getDate()+((i<n?-7:0)+6-(i-n))),l.setHours(23,59,59,999),l}e.s(["endOfWeek",()=>s])},8960,5300,71857,74875,e=>{"use strict";var t=e.i(81092);function a(e,a){return(0,t.toDate)(e,a?.in).getMonth()}function s(e,a){return(0,t.toDate)(e,a?.in).getFullYear()}function r(e,a){return+(0,t.toDate)(e)>+(0,t.toDate)(a)}function n(e,a){return+(0,t.toDate)(e)<+(0,t.toDate)(a)}e.s(["getMonth",()=>a],8960),e.s(["getYear",()=>s],5300),e.s(["isAfter",()=>r],71857),e.s(["isBefore",()=>n],74875)},8199,e=>{"use strict";var t=e.i(81092);function a(e,a){let s=(0,t.toDate)(e,a?.in);return s.setDate(1),s.setHours(0,0,0,0),s}e.s(["startOfMonth",()=>a])},39978,e=>{"use strict";var t=e.i(81092);function a(e,a){let s=(0,t.toDate)(e,a?.in),r=s.getMonth();return s.setFullYear(s.getFullYear(),r+1,0),s.setHours(23,59,59,999),s}e.s(["endOfMonth",()=>a])},88594,e=>{"use strict";var t=e.i(77241),a=e.i(81092);function s(e,s,r){let n=(0,a.toDate)(e,r?.in);if(isNaN(s))return(0,t.constructFrom)(r?.in||e,NaN);if(!s)return n;let l=n.getDate(),i=(0,t.constructFrom)(r?.in||e,n.getTime());return(i.setMonth(n.getMonth()+s+1,0),l>=i.getDate())?i:(n.setFullYear(i.getFullYear(),i.getMonth(),l),n)}e.s(["addMonths",()=>s])},87130,e=>{"use strict";let t=(0,e.i(75254).default)("funnel",[["path",{d:"M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",key:"sc7q7i"}]]);e.s(["Filter",()=>t],87130)},7856,e=>{"use strict";var t=e.i(43476),a=e.i(71645),s=e.i(1851),r=e.i(8199),n=e.i(39978),l=e.i(91855),i=e.i(80797),o=e.i(88594),d=e.i(19578),c=e.i(8960),u=e.i(5300),m=e.i(43551),x=e.i(98756),h=e.i(47697),f=e.i(40160),g=e.i(73375),b=e.i(63059),p=e.i(3116),v=e.i(87130),y=e.i(87316),j=e.i(17923),N=e.i(47163),T=e.i(67881),D=e.i(70065),C=e.i(27341),w=e.i(62870),k=e.i(57734),S=e.i(59377),M=e.i(94179),A=e.i(28231),O=e.i(47627),E=e.i(27250),H=e.i(99833);let L=["January","February","March","April","May","June","July","August","September","October","November","December"],_=Array.from({length:5},(e,t)=>2024+t);function z(){let[e,i]=a.useState("calendar"),[M,A]=a.useState(new Date),[z,$]=a.useState((0,r.startOfMonth)(new Date)),[U,B]=a.useState((0,n.endOfMonth)(new Date)),[V,W]=a.useState((0,c.getMonth)(new Date)),[Y,G]=a.useState((0,c.getMonth)(new Date)),[K,J]=a.useState((0,u.getYear)(new Date)),[q,X]=a.useState(!1),Q=a.useMemo(()=>(0,E.generateAttendanceRecords)(E.currentUser.id,z,U),[z,U]),Z=a.useMemo(()=>(0,E.calculateAttendanceSummary)(Q),[Q]),ee=a.useMemo(()=>{let e=(0,r.startOfMonth)(M),t=(0,n.endOfMonth)(M);return(0,E.generateAttendanceRecords)(E.currentUser.id,e,t)},[M]),et=a.useMemo(()=>(0,E.calculateAttendanceSummary)(ee),[ee]),ea=async()=>{var e,t,a,r;let n;X(!0);let l=new Blob([(e=Q,t=Z,a=z,r=U,n=e=>(0,s.format)(e,"MMMM d, yyyy"),`
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Attendance Report - ${E.currentUser.name}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
      padding: 40px; 
      color: #1a1a1a;
      line-height: 1.6;
    }
    .header { 
      display: flex; 
      justify-content: space-between; 
      align-items: flex-start;
      margin-bottom: 30px; 
      padding-bottom: 20px; 
      border-bottom: 2px solid #2563eb;
    }
    .logo { 
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .logo-icon {
      width: 40px;
      height: 40px;
      background: #2563eb;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      font-size: 18px;
    }
    .company-name { font-size: 24px; font-weight: 700; color: #2563eb; }
    .report-title { font-size: 14px; color: #666; margin-top: 4px; }
    .employee-info { text-align: right; }
    .employee-name { font-size: 18px; font-weight: 600; }
    .employee-details { font-size: 13px; color: #666; }
    .date-range { 
      background: #f8fafc; 
      padding: 16px 20px; 
      border-radius: 8px; 
      margin-bottom: 24px;
      border-left: 4px solid #2563eb;
    }
    .date-range-title { font-weight: 600; color: #333; margin-bottom: 4px; }
    .date-range-value { color: #666; }
    .summary { 
      display: grid; 
      grid-template-columns: repeat(4, 1fr); 
      gap: 16px; 
      margin-bottom: 30px; 
    }
    .summary-item { 
      padding: 16px; 
      border-radius: 8px; 
      text-align: center;
      border: 1px solid #e2e8f0;
    }
    .summary-item.present { background: #ecfdf5; border-color: #10b981; }
    .summary-item.absent { background: #fef2f2; border-color: #ef4444; }
    .summary-item.late { background: #fff7ed; border-color: #f97316; }
    .summary-item.wfh { background: #eff6ff; border-color: #3b82f6; }
    .summary-item.leave { background: #faf5ff; border-color: #a855f7; }
    .summary-item.hours { background: #f8fafc; border-color: #64748b; }
    .summary-value { font-size: 28px; font-weight: 700; }
    .summary-label { font-size: 12px; color: #666; margin-top: 4px; }
    .summary-item.present .summary-value { color: #10b981; }
    .summary-item.absent .summary-value { color: #ef4444; }
    .summary-item.late .summary-value { color: #f97316; }
    .summary-item.wfh .summary-value { color: #3b82f6; }
    .summary-item.leave .summary-value { color: #a855f7; }
    .summary-item.hours .summary-value { color: #64748b; }
    table { 
      width: 100%; 
      border-collapse: collapse; 
      margin-top: 20px;
      font-size: 12px;
    }
    th { 
      background: #f8fafc; 
      padding: 12px 8px; 
      text-align: left; 
      font-weight: 600;
      border-bottom: 2px solid #e2e8f0;
      color: #475569;
    }
    td { 
      padding: 10px 8px; 
      border-bottom: 1px solid #f1f5f9;
    }
    tr:hover { background: #fafafa; }
    .status { 
      display: inline-block;
      padding: 4px 8px; 
      border-radius: 4px; 
      font-size: 11px;
      font-weight: 500;
    }
    .status-present { background: #dcfce7; color: #166534; }
    .status-absent { background: #fee2e2; color: #991b1b; }
    .status-late { background: #ffedd5; color: #9a3412; }
    .status-half_day { background: #fef3c7; color: #92400e; }
    .status-wfh { background: #dbeafe; color: #1e40af; }
    .status-on_leave { background: #f3e8ff; color: #7c3aed; }
    .status-holiday { background: #fce7f3; color: #be185d; }
    .status-weekend { background: #f1f5f9; color: #64748b; }
    .footer { 
      margin-top: 40px; 
      padding-top: 20px; 
      border-top: 1px solid #e2e8f0;
      font-size: 11px;
      color: #94a3b8;
      text-align: center;
    }
    @media print {
      body { padding: 20px; }
      .summary { grid-template-columns: repeat(3, 1fr); }
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">
      <div class="logo-icon">IX</div>
      <div>
        <div class="company-name">Ixora Solutions</div>
        <div class="report-title">Leave Management System - Attendance Report</div>
      </div>
    </div>
    <div class="employee-info">
      <div class="employee-name">${E.currentUser.name}</div>
      <div class="employee-details">${E.currentUser.department} • ${E.currentUser.email}</div>
      <div class="employee-details">Employee ID: ${E.currentUser.id}</div>
    </div>
  </div>

  <div class="date-range">
    <div class="date-range-title">Report Period</div>
    <div class="date-range-value">${n(a)} - ${n(r)}</div>
  </div>

  <div class="summary">
    <div class="summary-item present">
      <div class="summary-value">${t.presentDays}</div>
      <div class="summary-label">Present Days</div>
    </div>
    <div class="summary-item absent">
      <div class="summary-value">${t.absentDays}</div>
      <div class="summary-label">Absent Days</div>
    </div>
    <div class="summary-item late">
      <div class="summary-value">${t.lateDays}</div>
      <div class="summary-label">Late Days</div>
    </div>
    <div class="summary-item wfh">
      <div class="summary-value">${t.wfhDays}</div>
      <div class="summary-label">WFH Days</div>
    </div>
    <div class="summary-item leave">
      <div class="summary-value">${t.leaveDays}</div>
      <div class="summary-label">On Leave</div>
    </div>
    <div class="summary-item hours">
      <div class="summary-value">${t.totalHoursWorked}</div>
      <div class="summary-label">Total Hours</div>
    </div>
  </div>

  <h3 style="margin-bottom: 8px; color: #1e293b;">Attendance Details</h3>
  <table>
    <thead>
      <tr>
        <th>Date</th>
        <th>Day</th>
        <th>Status</th>
        <th>Check In</th>
        <th>Check Out</th>
        <th>Hours</th>
        <th>Overtime</th>
        <th>Notes</th>
      </tr>
    </thead>
    <tbody>
      ${e.map(e=>`
        <tr>
          <td>${(0,s.format)(new Date(e.date),"MMM d, yyyy")}</td>
          <td>${(0,s.format)(new Date(e.date),"EEEE")}</td>
          <td><span class="status status-${e.status}">${H.ATTENDANCE_STATUS_LABELS[e.status]}</span></td>
          <td>${e.checkIn||"-"}</td>
          <td>${e.checkOut||"-"}</td>
          <td>${e.workHours?e.workHours+" hrs":"-"}</td>
          <td>${e.overtime?"+"+e.overtime+" hrs":"-"}</td>
          <td>${e.notes||"-"}</td>
        </tr>
      `).join("")}
    </tbody>
  </table>

  <div class="footer">
    Generated on ${(0,s.format)(new Date,"MMMM d, yyyy 'at' h:mm a")} • Ixora Solutions LMS
  </div>
</body>
</html>
  `)],{type:"text/html"}),i=URL.createObjectURL(l),o=window.open(i,"_blank");o&&(o.onload=()=>{o.print()}),X(!1)},es=(0,l.eachDayOfInterval)({start:(0,r.startOfMonth)(M),end:(0,n.endOfMonth)(M)});return(0,t.jsxs)("div",{className:"space-y-6",children:[(0,t.jsxs)("div",{className:"grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4",children:[(0,t.jsx)(P,{title:"Present Days",value:et.presentDays,icon:(0,t.jsx)("div",{className:"size-3 rounded-full bg-emerald-500"}),color:"text-emerald-600"}),(0,t.jsx)(P,{title:"Absent",value:et.absentDays,icon:(0,t.jsx)("div",{className:"size-3 rounded-full bg-red-500"}),color:"text-red-600"}),(0,t.jsx)(P,{title:"Late Days",value:et.lateDays,icon:(0,t.jsx)("div",{className:"size-3 rounded-full bg-orange-500"}),color:"text-orange-600"}),(0,t.jsx)(P,{title:"WFH Days",value:et.wfhDays,icon:(0,t.jsx)("div",{className:"size-3 rounded-full bg-blue-500"}),color:"text-blue-600"}),(0,t.jsx)(P,{title:"On Leave",value:et.leaveDays,icon:(0,t.jsx)("div",{className:"size-3 rounded-full bg-purple-500"}),color:"text-purple-600"}),(0,t.jsx)(P,{title:"Avg Hours/Day",value:et.averageHoursPerDay,icon:(0,t.jsx)(p.Clock,{className:"size-3 text-muted-foreground"}),color:"text-foreground",suffix:"hrs"})]}),(0,t.jsxs)(C.Tabs,{value:e,onValueChange:i,className:"space-y-4",children:[(0,t.jsxs)("div",{className:"flex flex-col sm:flex-row sm:items-center justify-between gap-4",children:[(0,t.jsxs)(C.TabsList,{children:[(0,t.jsxs)(C.TabsTrigger,{value:"calendar",className:"gap-2",children:[(0,t.jsx)(y.Calendar,{className:"size-4"}),"Calendar View"]}),(0,t.jsxs)(C.TabsTrigger,{value:"report",className:"gap-2",children:[(0,t.jsx)(j.BarChart3,{className:"size-4"}),"Report View"]})]}),(0,t.jsxs)(T.Button,{onClick:ea,disabled:q,className:"gap-2",children:[(0,t.jsx)(f.Download,{className:"size-4"}),q?"Generating...":"Download PDF"]})]}),(0,t.jsxs)(C.TabsContent,{value:"calendar",className:"space-y-4",children:[(0,t.jsxs)(D.Card,{children:[(0,t.jsxs)(D.CardHeader,{className:"flex flex-row items-center justify-between space-y-0 pb-4",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)(D.CardTitle,{className:"text-lg font-semibold",children:(0,s.format)(M,"MMMM yyyy")}),(0,t.jsx)(D.CardDescription,{children:"Click on any date to view details"})]}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)(T.Button,{variant:"outline",size:"icon",onClick:()=>A((0,d.subMonths)(M,1)),children:(0,t.jsx)(g.ChevronLeft,{className:"size-4"})}),(0,t.jsx)(T.Button,{variant:"outline",size:"icon",onClick:()=>A((0,o.addMonths)(M,1)),children:(0,t.jsx)(b.ChevronRight,{className:"size-4"})})]})]}),(0,t.jsx)(D.CardContent,{children:(0,t.jsx)(R,{days:es,currentMonth:M,getRecordForDate:e=>{let t=(0,s.format)(e,"yyyy-MM-dd");return ee.find(e=>e.date===t)}})})]}),(0,t.jsx)(D.Card,{children:(0,t.jsx)(D.CardContent,{className:"pt-6",children:(0,t.jsx)("div",{className:"flex flex-wrap gap-4",children:Object.entries(H.ATTENDANCE_STATUS_COLORS).map(([e,a])=>(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("div",{className:(0,N.cn)("size-3 rounded-full",a.dot)}),(0,t.jsx)("span",{className:"text-sm text-muted-foreground",children:H.ATTENDANCE_STATUS_LABELS[e]})]},e))})})})]}),(0,t.jsxs)(C.TabsContent,{value:"report",className:"space-y-4",children:[(0,t.jsxs)(D.Card,{children:[(0,t.jsx)(D.CardHeader,{children:(0,t.jsxs)(D.CardTitle,{className:"text-lg flex items-center gap-2",children:[(0,t.jsx)(v.Filter,{className:"size-5"}),"Filter Report"]})}),(0,t.jsx)(D.CardContent,{children:(0,t.jsxs)("div",{className:"flex flex-col sm:flex-row gap-4",children:[(0,t.jsxs)("div",{className:"grid grid-cols-2 sm:grid-cols-4 gap-4 flex-1",children:[(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsx)("label",{className:"text-sm font-medium",children:"Start Date"}),(0,t.jsxs)(S.Popover,{children:[(0,t.jsx)(S.PopoverTrigger,{asChild:!0,children:(0,t.jsxs)(T.Button,{variant:"outline",className:(0,N.cn)("w-full justify-start text-left font-normal",!z&&"text-muted-foreground"),children:[(0,t.jsx)(h.CalendarIcon,{className:"mr-2 size-4"}),z?(0,s.format)(z,"PP"):"Pick a date"]})}),(0,t.jsx)(S.PopoverContent,{className:"w-auto p-0",align:"start",children:(0,t.jsx)(k.Calendar,{mode:"single",selected:z,onSelect:e=>e&&$(e),initialFocus:!0})})]})]}),(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsx)("label",{className:"text-sm font-medium",children:"End Date"}),(0,t.jsxs)(S.Popover,{children:[(0,t.jsx)(S.PopoverTrigger,{asChild:!0,children:(0,t.jsxs)(T.Button,{variant:"outline",className:(0,N.cn)("w-full justify-start text-left font-normal",!U&&"text-muted-foreground"),children:[(0,t.jsx)(h.CalendarIcon,{className:"mr-2 size-4"}),U?(0,s.format)(U,"PP"):"Pick a date"]})}),(0,t.jsx)(S.PopoverContent,{className:"w-auto p-0",align:"start",children:(0,t.jsx)(k.Calendar,{mode:"single",selected:U,onSelect:e=>e&&B(e),initialFocus:!0})})]})]}),(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsx)("label",{className:"text-sm font-medium",children:"From Month"}),(0,t.jsxs)(w.Select,{value:V.toString(),onValueChange:e=>W(parseInt(e)),children:[(0,t.jsx)(w.SelectTrigger,{children:(0,t.jsx)(w.SelectValue,{})}),(0,t.jsx)(w.SelectContent,{children:L.map((e,a)=>(0,t.jsx)(w.SelectItem,{value:a.toString(),children:e},e))})]})]}),(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsx)("label",{className:"text-sm font-medium",children:"To Month"}),(0,t.jsxs)(w.Select,{value:Y.toString(),onValueChange:e=>G(parseInt(e)),children:[(0,t.jsx)(w.SelectTrigger,{children:(0,t.jsx)(w.SelectValue,{})}),(0,t.jsx)(w.SelectContent,{children:L.map((e,a)=>(0,t.jsx)(w.SelectItem,{value:a.toString(),children:e},e))})]})]})]}),(0,t.jsxs)("div",{className:"flex items-end gap-2",children:[(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsx)("label",{className:"text-sm font-medium",children:"Year"}),(0,t.jsxs)(w.Select,{value:K.toString(),onValueChange:e=>J(parseInt(e)),children:[(0,t.jsx)(w.SelectTrigger,{className:"w-24",children:(0,t.jsx)(w.SelectValue,{})}),(0,t.jsx)(w.SelectContent,{children:_.map(e=>(0,t.jsx)(w.SelectItem,{value:e.toString(),children:e},e))})]})]}),(0,t.jsx)(T.Button,{onClick:()=>{let e=(0,x.setYear)((0,m.setMonth)(new Date,V),K),t=(0,x.setYear)((0,m.setMonth)(new Date,Y),K);$((0,r.startOfMonth)(e)),B((0,n.endOfMonth)(t))},children:"Apply"})]})]})})]}),(0,t.jsxs)(D.Card,{children:[(0,t.jsx)(D.CardHeader,{children:(0,t.jsxs)(D.CardTitle,{className:"text-lg",children:["Summary: ",(0,s.format)(z,"MMM d, yyyy")," - ",(0,s.format)(U,"MMM d, yyyy")]})}),(0,t.jsx)(D.CardContent,{children:(0,t.jsxs)("div",{className:"grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4",children:[(0,t.jsx)(I,{label:"Total Working Days",value:Z.totalWorkingDays}),(0,t.jsx)(I,{label:"Present Days",value:Z.presentDays,color:"text-emerald-600"}),(0,t.jsx)(I,{label:"Absent Days",value:Z.absentDays,color:"text-red-600"}),(0,t.jsx)(I,{label:"Late Days",value:Z.lateDays,color:"text-orange-600"}),(0,t.jsx)(I,{label:"Half Days",value:Z.halfDays,color:"text-amber-600"}),(0,t.jsx)(I,{label:"WFH Days",value:Z.wfhDays,color:"text-blue-600"}),(0,t.jsx)(I,{label:"Leave Days",value:Z.leaveDays,color:"text-purple-600"}),(0,t.jsx)(I,{label:"Holidays",value:Z.holidays,color:"text-pink-600"}),(0,t.jsx)(I,{label:"Weekends",value:Z.weekends,color:"text-slate-500"}),(0,t.jsx)(I,{label:"Total Hours",value:Z.totalHoursWorked,suffix:"hrs"}),(0,t.jsx)(I,{label:"Avg Hours/Day",value:Z.averageHoursPerDay,suffix:"hrs"}),(0,t.jsx)(I,{label:"Overtime",value:Z.overtimeHours,suffix:"hrs",color:"text-emerald-600"})]})})]}),(0,t.jsxs)(D.Card,{children:[(0,t.jsxs)(D.CardHeader,{children:[(0,t.jsx)(D.CardTitle,{className:"text-lg",children:"Attendance Details"}),(0,t.jsxs)(D.CardDescription,{children:["Showing ",Q.length," records"]})]}),(0,t.jsx)(D.CardContent,{children:(0,t.jsx)("div",{className:"rounded-md border overflow-x-auto",children:(0,t.jsxs)(O.Table,{children:[(0,t.jsx)(O.TableHeader,{children:(0,t.jsxs)(O.TableRow,{children:[(0,t.jsx)(O.TableHead,{children:"Date"}),(0,t.jsx)(O.TableHead,{children:"Day"}),(0,t.jsx)(O.TableHead,{children:"Status"}),(0,t.jsx)(O.TableHead,{children:"Check In"}),(0,t.jsx)(O.TableHead,{children:"Check Out"}),(0,t.jsx)(O.TableHead,{children:"Work Hours"}),(0,t.jsx)(O.TableHead,{children:"Overtime"}),(0,t.jsx)(O.TableHead,{children:"Notes"})]})}),(0,t.jsx)(O.TableBody,{children:Q.map(e=>(0,t.jsxs)(O.TableRow,{children:[(0,t.jsx)(O.TableCell,{className:"font-medium",children:(0,s.format)(new Date(e.date),"MMM d, yyyy")}),(0,t.jsx)(O.TableCell,{children:(0,s.format)(new Date(e.date),"EEEE")}),(0,t.jsx)(O.TableCell,{children:(0,t.jsx)(F,{status:e.status})}),(0,t.jsx)(O.TableCell,{children:e.checkIn||"-"}),(0,t.jsx)(O.TableCell,{children:e.checkOut||"-"}),(0,t.jsx)(O.TableCell,{children:e.workHours?`${e.workHours} hrs`:"-"}),(0,t.jsx)(O.TableCell,{children:e.overtime?(0,t.jsxs)("span",{className:"text-emerald-600 font-medium",children:["+",e.overtime," hrs"]}):"-"}),(0,t.jsx)(O.TableCell,{className:"max-w-[200px] truncate",children:e.notes||"-"})]},e.id))})]})})})]})]})]})]})}function P({title:e,value:a,icon:s,color:r,suffix:n}){return(0,t.jsx)(D.Card,{children:(0,t.jsxs)(D.CardContent,{className:"pt-6",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 mb-2",children:[s,(0,t.jsx)("span",{className:"text-sm text-muted-foreground",children:e})]}),(0,t.jsxs)("p",{className:(0,N.cn)("text-2xl font-bold",r),children:[a,n&&(0,t.jsx)("span",{className:"text-base font-normal ml-1",children:n})]})]})})}function I({label:e,value:a,color:s="text-foreground",suffix:r}){return(0,t.jsxs)("div",{className:"p-4 rounded-lg bg-muted/50",children:[(0,t.jsx)("p",{className:"text-sm text-muted-foreground mb-1",children:e}),(0,t.jsxs)("p",{className:(0,N.cn)("text-xl font-semibold",s),children:[a,r&&(0,t.jsx)("span",{className:"text-sm font-normal ml-1",children:r})]})]})}function F({status:e}){let a=H.ATTENDANCE_STATUS_COLORS[e];return(0,t.jsx)(M.Badge,{variant:"secondary",className:(0,N.cn)(a.bg,a.text,"border-0"),children:H.ATTENDANCE_STATUS_LABELS[e]})}function R({days:e,currentMonth:a,getRecordForDate:r}){let n=Array.from({length:e[0].getDay()},(e,a)=>(0,t.jsx)("div",{className:"h-24 bg-muted/30 rounded-lg"},`empty-${a}`));return(0,t.jsx)(A.TooltipProvider,{children:(0,t.jsxs)("div",{className:"space-y-2",children:[(0,t.jsx)("div",{className:"grid grid-cols-7 gap-2",children:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(e=>(0,t.jsx)("div",{className:"text-center text-sm font-medium text-muted-foreground py-2",children:e},e))}),(0,t.jsxs)("div",{className:"grid grid-cols-7 gap-2",children:[n,e.map(e=>{let a=r(e),n=a?H.ATTENDANCE_STATUS_COLORS[a.status]:{bg:"bg-muted/50",text:"text-muted-foreground",dot:"bg-muted"};return(0,t.jsxs)(A.Tooltip,{children:[(0,t.jsx)(A.TooltipTrigger,{asChild:!0,children:(0,t.jsxs)("div",{className:(0,N.cn)("h-24 p-2 rounded-lg border cursor-pointer transition-colors hover:border-primary/50",n.bg,(0,i.isToday)(e)&&"ring-2 ring-primary ring-offset-2"),children:[(0,t.jsxs)("div",{className:"flex items-start justify-between",children:[(0,t.jsx)("span",{className:(0,N.cn)("text-sm font-medium",(0,i.isToday)(e)?"text-primary":n.text),children:(0,s.format)(e,"d")}),(0,t.jsx)("div",{className:(0,N.cn)("size-2 rounded-full",n.dot)})]}),a&&(0,t.jsxs)("div",{className:"mt-1 space-y-1",children:[(0,t.jsx)("p",{className:(0,N.cn)("text-xs truncate",n.text),children:H.ATTENDANCE_STATUS_LABELS[a.status]}),a.checkIn&&(0,t.jsxs)("p",{className:"text-xs text-muted-foreground",children:[a.checkIn," - ",a.checkOut]})]})]})}),(0,t.jsx)(A.TooltipContent,{side:"top",className:"max-w-xs",children:(0,t.jsxs)("div",{className:"space-y-1",children:[(0,t.jsx)("p",{className:"font-medium",children:(0,s.format)(e,"EEEE, MMMM d, yyyy")}),a&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("p",{children:["Status: ",H.ATTENDANCE_STATUS_LABELS[a.status]]}),a.checkIn&&(0,t.jsxs)("p",{children:["Check In: ",a.checkIn]}),a.checkOut&&(0,t.jsxs)("p",{children:["Check Out: ",a.checkOut]}),a.workHours&&(0,t.jsxs)("p",{children:["Hours Worked: ",a.workHours]}),a.overtime&&(0,t.jsxs)("p",{children:["Overtime: ",a.overtime," hrs"]}),a.notes&&(0,t.jsxs)("p",{children:["Notes: ",a.notes]})]})]})})]},e.toISOString())})]})]})})}e.s(["AttendanceReport",()=>z])}]);