interface SummaryStepProps {
    t: any;
}

export const SummaryStep = ({ t }: SummaryStepProps) => {
    return (
        <div className="space-y-4">
            <p>{t.budgetRequest.summary.description}</p>
        </div>
    );
};
