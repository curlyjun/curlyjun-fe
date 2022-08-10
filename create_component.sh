

# 입력 받기
echo "폴더명 입력"
read folder
echo "컴포넌트명 입력"
read component

set -e


mkdir src/components/$folder
echo "import * as Styled from './$component.style'\n\ninterface ${component}Props {}\n\nconst $component = ({}: ${component}Props) => {\n  return <Styled.Container></Styled.Container>\n}\n\nexport default $component" > src/components/$folder/$component.tsx
echo "export { default as $component } from './$component'" > src/components/$folder/index.ts
echo "import styled from 'styled-components'\n\nexport const Container = styled.div\`\`" > src/components/$folder/$component.style.ts


