export class Parameter {
  id: number = 0
  name: string = "parameter"
  description: string = "description"
  min?: number
  max?: number

  value: number | undefined
}
