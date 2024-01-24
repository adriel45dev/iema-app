import DisciplinaType from "./Disciplina.type";
import ProfessorType from "./Professor.type";

type GradeType = {
  [key: string]: {
    professores: ProfessorType[];
    disciplina: DisciplinaType;
  };
};

export default GradeType;
