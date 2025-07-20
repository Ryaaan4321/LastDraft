type Experience = Record<string, any>;

export const moveExperienceUp = (
    experiences: Experience[],
    index: number
): Experience[] => {
    if (index === 0) return experiences;
    const newExp = [...experiences];
    [newExp[index - 1], newExp[index]] = [newExp[index], newExp[index - 1]];
    return newExp;
};

export const moveExperienceDown = (
    experiences: Experience[],
    index: number
): Experience[] => {
    if (index === experiences.length - 1) return experiences;
    const newExp = [...experiences];
    [newExp[index + 1], newExp[index]] = [newExp[index], newExp[index + 1]];
    return newExp;
};
