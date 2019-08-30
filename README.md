# Restaurangen-fe - Style Guide

- Use 2 spaces for indentation.

- Only include one React component per file.
  ⋅⋅⋅ -However, multiple Stateless, or Pure, Components are allowed per file.

- Use the filename as the component name.
  ⋅⋅⋅ For example, ReservationCard.jsx should have a reference name of ReservationCard.

- Always use double quotes (") for JSX attributes, but single quotes (') for all other JS.

- Alignment, follow these alignment styles for JSX syntax. :
  ⋅⋅⋅ // bad
  ⋅⋅⋅ <Foo superLongParam="bar"
  ⋅⋅⋅ anotherSuperLongParam="baz" />
  ⋅⋅⋅
  ⋅⋅⋅ // good
  ⋅⋅⋅ <Foo
  ⋅⋅⋅ superLongParam="bar"
  ⋅⋅⋅ anotherSuperLongParam="baz"
  ⋅⋅⋅ />
  ⋅⋅⋅
  ⋅⋅⋅ // if props fit in one line then keep it on the same line
  ⋅⋅⋅ <Foo bar="bar" />
  ⋅⋅⋅
  ⋅⋅⋅ // children get indented normally
  ⋅⋅⋅ <Foo
  ⋅⋅⋅ superLongParam="bar"
  ⋅⋅⋅ anotherSuperLongParam="baz"
  ⋅⋅⋅ >
  ⋅⋅⋅ <Quux />
  ⋅⋅⋅ </Foo>
  ⋅⋅⋅
  ⋅⋅⋅ // bad
  ⋅⋅⋅ {showButton &&
  ⋅⋅⋅ <Button />
  ⋅⋅⋅ }
  ⋅⋅⋅
  ⋅⋅⋅ // bad
  ⋅⋅⋅ {
  ⋅⋅⋅ showButton &&
  ⋅⋅⋅ <Button />
  ⋅⋅⋅ }
  ⋅⋅⋅
  ⋅⋅⋅ // good
  ⋅⋅⋅ {showButton && (
  ⋅⋅⋅ <Button />
  ⋅⋅⋅ )}
  ⋅⋅⋅
  ⋅⋅⋅ // good
  ⋅⋅⋅ {showButton && <Button />}

- Always include a single space in your self-closing tag.
  ⋅⋅⋅ // bad
  ⋅⋅⋅ <Foo/>
  ⋅⋅⋅
  ⋅⋅⋅ // very bad
  ⋅⋅⋅ <Foo                 />
  ⋅⋅⋅
  ⋅⋅⋅ // bad
  ⋅⋅⋅ <Foo
  ⋅⋅⋅ />
  ⋅⋅⋅
  ⋅⋅⋅ // good
  ⋅⋅⋅ <Foo />

- Always use camelCase for prop names.

- Avoid using an array index as key prop, prefer a stable ID.
  ⋅⋅⋅ Why? Not using a stable ID is an anti-pattern because it can negatively impact performance ⋅⋅⋅ and cause issues with component state.

- Always self-close tags that have no children.
  ⋅⋅⋅ // bad
  ⋅⋅⋅ <Foo variant="stuff"></Foo>
  ⋅⋅⋅
  ⋅⋅⋅ // good
  ⋅⋅⋅ <Foo variant="stuff" />

- If your component has multi-line properties, close its tag on a new line.
  ⋅⋅⋅ // bad
  ⋅⋅⋅ <Foo
  ⋅⋅⋅ bar="bar"
  ⋅⋅⋅ baz="baz" />
  ⋅⋅⋅
  ⋅⋅⋅ // good
  ⋅⋅⋅ <Foo
  ⋅⋅⋅ bar="bar"
  ⋅⋅⋅ baz="baz"
  ⋅⋅⋅ />

- Do not use underscore prefix for internal methods of a React component.
  ⋅⋅⋅ Why? Underscore prefixes are sometimes used as a convention in other languages to denote privacy. But, unlike those languages, there is no native support for privacy in JavaScript,everything is public. Regardless of your intentions, adding underscore prefixes to your properties does not actually make them private, and any property (underscore-prefixed or not) should be treated as being public.

- If you have three or more properties, then put them on their own line both in the instance and in the render function.
  ⋅⋅⋅ // it should look like this:
  ⋅⋅⋅ let { imgSrc,
  ⋅⋅⋅ title,
  ⋅⋅⋅ artist,
  ⋅⋅⋅ clas,
  ⋅⋅⋅ thumbnail,
  ⋅⋅⋅ breakpoint } = this.props;
  ⋅⋅⋅
  ⋅⋅⋅ <GalleryImage
  ⋅⋅⋅ imgSrc="./src/img/vangogh2.jpg"
  ⋅⋅⋅ title="Starry Night"
  ⋅⋅⋅ artist="Van Gogh"
  ⋅⋅⋅ clas="landscape"
  ⋅⋅⋅ thumbnail="./src/img/thumb/vangogh2.gif"
  ⋅⋅⋅ breakpoint={320} />

- Destructure your props and state
  ⋅⋅⋅ // it should look like this:
  ⋅⋅⋅ let { breed, color, isGoodBoy } = this.props;
  ⋅⋅⋅
  ⋅⋅⋅ // or, when possible:
  ⋅⋅⋅ // avoid this
  ⋅⋅⋅ let Dog = (breed, color, goodOrBad) =>
  ⋅⋅⋅ My {props.color} dog is {props.goodOrBad}
  ⋅⋅⋅
  ⋅⋅⋅ // better
  ⋅⋅⋅ let Dog = ({breed, color, goodOrBad}) =>
  ⋅⋅⋅ My {color} dog is {goodOrBad}

- Interface names are to be written in PascalCase, with a capital I for interface i the beginning: interface IPsacalCase { … }

- Name methods using 'handle' + triggering event, e.g. handleClick

- Bind handler using the ES6 arrow syntax, so inside the callback it has always the right context, ex:
  ⋅⋅⋅ methodName = (myString: string) => {
  ⋅⋅⋅ console.log(string);
  ⋅⋅⋅ }

- When rendering a list of components from an array, do it inline if it makes sense. If the map function is too long or complicated, consider extracting it out into its own method on the component class.

- Ordering for class extends React.Component:
  ⋅⋅1. constructor
  ⋅⋅2. optional static methods
  ⋅⋅3. getChildContext
  ⋅⋅4. componentWillMount
  ⋅⋅5. componentDidMount
  ⋅⋅6. componentWillReceiveProps
  ⋅⋅7. shouldComponentUpdate
  ⋅⋅8. componentWillUpdate
  ⋅⋅9. componentDidUpdate
  ⋅⋅10. componentWillUnmount
  ⋅⋅11. clickHandlers or eventHandlers like onClickSubmit() or onChangeDescription()
  ⋅⋅12. getter methods for render like getSelectReason() or getFooterContent()
  ⋅⋅13. Optional render methods like renderNavigation() or renderProfilePicture()
  ⋅⋅14. render
