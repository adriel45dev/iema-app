import ProfessorType from "./Professor.type";

type DisciplinasType = {
  name: string;
  id: string;
  professores?: ProfessorType[];
};

export default DisciplinasType;
