//noImplicitAny의 기능은 타입을 지정하지 않으면  타입스크립트가 any라고 판단하게 되면 에러를 발생시켜 타입을 지정하도록 유도
// function f1(a:number){
//     if (a>0){
//         return a*3;
//     }
// }
// console.log(f1("qw"));
// strictNullChecks 옵션을 키면 모든 타입에 자동으로 포함 되어있는 null과 undifined를 제거해줌 즉 null과 undifined가 생기는 이유를 추론해줌
//즉 null 과 undifined로 인한 복잡해진 오류를 좀 더 정확하고 명확하게 캐치 가능하다고 느낌
//명시적으로 리턴타입을 지정 해주는것을 권장한다
// function f1(a:number){
//     if (a>0){
//         return a*3;
//     }
// }
// console.log(f1(1)+3);
// noImplicitReturns 옵션을 사용하면 함수에서 값을 리턴하지 않으면 에러를 발생시킴
// console.log(f1(1)+3);
// function f6(a:{name:string; age:number}){
//     return `이름은 ${a.name}이고 연령대는 ${Math.floor(a.age/10)*10}대 입니다.`;
// }
// console.log(f6({name:'mark',age:38}));
// console.log(f6('mark'));
// 나만의 타입 만드는 방법
// interface는 타입스크립의 여러객체를 정의하는 일종이 규칙이고 키워드이다 객체만 가능!!
// 타입 별칭 또한  type 키워드를 사용해  타입 조합을 만들 수 있다. 객체 말고도 다른타입도 가능
//as 키워드란 요약하자면 '컴파일' 단계에서 타입 검사를 할 때 타입스크립트가 감지하지 못하는 애매한 타입 요소들을 직접 명시해주는 키워드라고 볼 수 있다.
// as any는  컴파일러에게 해당 변수의 형식을 강제로 지정하는 역할 즉 검사기가 해당표현식에 대한 검사를 진행하지 않고 any 형식으로 간주함
//타입스크립트 유니온 타입 | (파이프라인) 키워드를 이용해서 유니온 타입 지정을 한다.
// | 는 자바스크립트의 or연산자랑 똑같음
//인터섹션 타입은 &로 여러타입을 모두 만족하는 하나의 타입을 뜻함 속성 타입을 모두 합한 규격을 전달해야 문법 오류가 뜨지 않는다.
// readonly는 읽기 전용 프로퍼티로 객체 생성시 할당된 프로퍼티의 값을 바꿀수 없고 읽을수만 있습니다
//brand는 타입스크립트에서 값을 구분하기 위해 사용되는 추가적인 타입 정보입니다. 예를 들어, 숫자를 나타내는 number 타입은 여러 상황에서 동일한 타입으로 취급되지만, brand을 추가하면 값을 구분할 수 있습니다.
// 여기서는 구조가 같으면 같은 타입으로 인식 structural type system
// interface iPerson{
//     name: string;
//     age: number;
//     speak(): string;
// }
// interface tPerson{
//     name: string;
//     age: number;
//     speak(): string;
// }
// let personInterface: iPerson ={} as any;
// let personType: tPerson ={} as any;
// personInterface = personType;
// personType = personInterface;
// nominal type system은 구조가 같아도 이름이 다르면 다른 타입으로 판단 
// type uniqID = string & {readonly brand: unique symbol};
// function personID(id:string):uniqID{
//     return id as uniqID;
// }
// function getPersonbyid(id: uniqID){};
// getPersonbyid(personID('id-aaa'));
// getPersonbyid('id-aaa');
//서브타입,슈퍼타입는 하위 상위 타입이라고 생각하면됨 하위 타입이 상위타입에는 들어갈 수 있지만 그반대는 안된다.
// 예시
// let sub: 1 = 1;
// let sup: number = sub;
// sub = sup;
//오류코드
// types.ts:88:1 - error TS2322: Type 'number' is not assignable to type '1'.
// 88 sub = sup;
//    ~~~
//any 같은 경우는 깍두기 같은 느낌이라 서브타입 슈퍼타입 적용이 안됨 
// never는 모든타입의 서브타입이다.
//extends를 사용해 클래스를 확장하면 확장된 클래스가 서브타입이고 기존 클래스가 슈퍼타입이다.
//같거나 서브 타입인 경우, 할당이 가능하다 => 공변
//예시
//  let sub: string ='';
//  let sup: string | number = sub;
// 오브젝트,배열도 동일하게 프로퍼티가 같거나 서브타입이면 할당 가능  
// 함수의 매개변수 - 타입만 같거나 슈퍼타입인 경우, 할당이 가느하다 =>반병
// class Person {}
// class Developer extends Person{
//     coding(){};
// }
// class SuperDeveloper extends Developer{
//     burning(){};
// }
// function tellme(f:(d:Developer)=>Developer){}
// Developer에다가  Developer=> Developer를 할당하는 경우
// tellme(function innerD(d:Developer):Developer{
//     return new Developer();
// });
//Developer에다가 Person => Developer를 할당하는 경우  (매개변수에 슈퍼타입을)
// tellme(function innerD2(d:Person):Developer{
//     return new Developer();
// });
//Developer에다가 SuperDeveloper => Developer를 할당하는 경우  (매개변수에 서브타입을) 문제가 될 수 있음
// tellme(function innerD2(d:SuperDeveloper):Developer{
//     return new Developer();
// });
// 그래서 strictFunctionTypes 을 켜주면 함수의 매개변수 타입만 같거나 슈퍼타입이 아닌경우 에러를 경고
// 에러코드 
// types.ts:130:17 - error TS2345: Argument of type '(d: SuperDeveloper) => Developer' is not assignable to parameter of type '(d: Developer) => Developer'.
//   Types of parameters 'd' and 'd' are incompatible.
//     Property 'burning' is missing in type 'Developer' but required in type 'SuperDeveloper'.  
// 130 tellme(function innerD2(d:SuperDeveloper):Developer{
//                     ~~~~~~~
//   types.ts:115:5
//     115     burning(){};
//             ~~~~~~~
//     'burning' is declared here.
//any
// 입력은 마음대로  함수구현이 자유롭지만 자유가 항상 좋은건 아니다
//예시에서 a.toString(); 이부분이 문제가 될 수 있음
// function fn(a:any):number | string | void{
//     a.toString();
//     if(typeof a === "number"){
//         return a * 38;
//     }else if (typeof a === "string"){
//         return `hi ${a}`;
//     }
// }
// console.log(fn(10));
// console.log(fn('ada'));
// console.log(fn(true));
// 그래서 any 대신에 unknown 을 사용하면 안정성을 높일 수 있다.
// function fn(a:unknown):number | string | void{
//     a.toString();
//     if(typeof a === "number"){
//         return a * 38;
//     }else if (typeof a === "string"){
//         return `hi ${a}`;
//     }
// }
// console.log(fn(10));
// console.log(fn('ada'));
// console.log(fn(true));
// 에러코드
// [오후 11:58:14] Starting compilation in watch mode...
// types.ts:169:5 - error TS18046: 'a' is of type 'unknown'.
// 169     a.toString();
//         ~
//타입추론 이해하기
