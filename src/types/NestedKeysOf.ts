// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
/* prettier-ignore */ export type TypeNestedKeyOf<ObjectType extends object> = { [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object ? `${Key}` | `${Key}.${TypeNestedKeyOf<ObjectType[Key]>}` : `${Key}` }[keyof ObjectType & (string | number)];
