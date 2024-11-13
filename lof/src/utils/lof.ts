// Laws Of Form - George Spencer Brown
// As interpreted by JT Guzman

// 1. The Form

// Distinction is perfect continence
type Distinction = {
  space: Space,
  name?: string
}

type Space = Distinction | Distinction[] | []

// Axiom 1. Law of calling
const calling = (m: Space, n: Space): any => {
  if (JSON.stringify(m) === JSON.stringify(n)) return m;
  return []
}

// Axiom 2. Law of crossing
const crossing = (m: Space, n: Space): any => {
  if (JSON.stringify(m) === JSON.stringify(n)) return [];
  return m
}


// Construction of the Form - As interpreted by JT Guzman
// Mark operation
const mark = (name: string): Distinction => {
  return {
    space: [],
    name
  }
}

// Cross operation
const cross = (form: Distinction, cross: Distinction) => {
  let crossed = {...form};
  crossed.space = {...cross};

  return crossed
}

// Instance of a Form
// const form: Distinction = {
//   space: [],
//   name: 'form'
// }

// Instance of an Expression
// const expression: Distinction = {
//   space: [{...form}],
//   name: 'expression'
// }

// Form of Condensation [][] = []
const condensation = (expression: Distinction): Distinction => {
  if (Array.isArray(expression.space) && (expression.space.length % 2 === 0)) {
    const half = Math.floor(expression.space.length / 2)
    let left = expression.space.slice(0, half);
    let right = expression.space.slice(half, expression.space.length);
    const evaluation = calling(left, right);
    if (evaluation) {
      return {
        space: evaluation,
        name: expression.name
      }
    }
  }
  return expression;
}

// Instance of a Condensation candidate
// const condensationForm: Distinction = {
//   space: [{ ...form }, { ...form }],
//   name: 'condensation'
// }

// Form of Confirmation [] = [][]
// Form of Confirmation [] = [][]
const confirmation = (expression: Distinction): Distinction => {
  const space = expression.space as Distinction;
  return {
    space: [space, space],
    name: expression.name
  }
}

// Instance of a Confirmation candidate
// 
// const confirmationForm: Distinction = {
//   space: form,
//   name: 'confirmation'
// }

// Form of Cancelation [[]] = false
const cancelation = (expression: Distinction): Distinction => {
  const selectSpace = (space: Space, depth: Number | Boolean) => {
    let selectedSpace = []

    if (Array.isArray(space)) {
      if (space.length > 1) {
        return []
      }
      selectedSpace.push(space[0])
    } else {
      selectedSpace.push(space)
    }

    if (depth === 0) {
      selectedSpace[0].space = []
    } else if (depth === 1) {
      return selectedSpace[0].space
    }

    return selectedSpace
  }

  const space0 = selectSpace(expression.space, 0)
  const space1 = selectSpace(expression.space, 1)
  const evaluation = crossing(space0, space1);

  if (!evaluation) {
    return {
      space: evaluation,
      name: expression.name
    }
  }

  return expression
}

// Instance of a Cancelation candidate
// const cancelationForm: Distinction = {
//   space: cross(form, form),
//   name: 'cancelation'
// }

// Form of Compensation  = [[]]
const compensation = (expression: Distinction, form: Distinction): Distinction => {
  if (!form) {
    form = {...expression}
  }
  let compensatedSpace = []
  if (Object.keys(expression.space).length === 0 || (Array.isArray(expression.space) && expression.space.length === 0)) {
    compensatedSpace = [cross(form, form)]
  } else {
    compensatedSpace = [cross(form, form)].concat(expression.space)
  }
return {
    space: compensatedSpace,
    name: expression.name
  }
}

// Instance of a Compensation candidate
// const compesationForm: Distinction = {
//   space: [],
//   name: 'compensation'
// }

// Depth function
const depth = (expression: Distinction) => {
  let level = 0;
  let current = expression;
  while (current.space) { // Shallowest space
    level++;
    if (Array.isArray(current.space) && current.space.length === 0) {
      break;
    }
    current = current.space as Distinction; // Pervaded space 
  }

  if (Array.isArray(current)) {
    for (let i = 0; i < current.length; i++) {
      if (depth(current[i]) >= level) { // Only add the deepest spaces
        level += depth(current[i]);
      }
    }
  }

  return level
}

// Instance of a Form with complex depth
// const formWithComplexDepth: Distinction = {
//   space: [{...form, ...cross(form, cross(form, form))}, {...form}, {...form, ...cross(form, form)}],
//   name: 'formWithComplexDepth'
// }

// The Concept of Calculation
// Step ⇀ 
type Step = {
  expression: Distinction,
  operation: (expression: Distinction, options: Distinction) => Distinction,
  result: Distinction,
  name: string
}

// Instance of a Step
// const step = (expression: Distinction, operation: (expression: Distinction, options: Distinction) => Distinction, options: Distinction): Step => {
//   return {
//     expression,
//     operation,
//     result: operation(expression, {...options}),
//     name: operation.name
//   }
// }

export type {
  Distinction,
  Space,
  Step,
}

export default {
  calling,
  crossing,
  cross,
  condensation,
  confirmation,
  cancelation,
  compensation,
  depth,
  mark,
}