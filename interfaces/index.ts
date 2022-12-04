export type Employee = {
  id: string;
  email: string;
  first_name: string;
  gender: string;
  last_name: string;
  salary: number;
};

// model Employee {
//     id         String @id @default(auto()) @map("_id") @db.ObjectId
//     v          Int    @map("__v")
//     email      String
//     first_name String
//     gender     String
//     last_name  String
//     salary     Int
//   }
